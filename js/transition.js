document.addEventListener('DOMContentLoaded', () => {
    let aboutLink = document.getElementById('aboutLink');
    let workLink = document.getElementById('workLink');
    let projectLink = document.getElementById('projectLink');
    let contactLink = document.getElementById('contactLink');

    let linkArray = [aboutLink, workLink, projectLink, contactLink];

    linkArray.forEach(link => {

        console.log(link);
        link.addEventListener('click', (e) => {
            linkArray.forEach(link => {
                link.classList.remove('active');
            });
            link.classList.add('active');
            switch (link) {
                case aboutLink:
                    fetchContent(link, 'about.html');
                    break;
                case workLink:
                    fetchContent(link, 'work.html');
                    break;
                case projectLink:
                    fetchContent(link, 'project.html');
                    break;
                case contactLink:
                    fetchContent(link, 'contact.html');
                    break;

            }
        })
    });

    function fetchContent(link, page) {
        let baseURL = `${window.location.protocol}//${window.location.hostname}`;

        if (window.location.port) {
            baseURL += `:${window.location.port}`;
        }

        fetch(`${baseURL}/${page}`)
            .then(function (response) {
                return response.text()
            })
            .then(function (html) {
                let doc = new DOMParser().parseFromString(html, "text/html");
                console.log(doc.querySelector('.container'));

                const section = document.getElementsByClassName('content')[0];
                anime({
                    targets: '.content',
                    translateX: -500,
                    opacity: [1, 0],
                    easing: 'linear',
                    duration: 600,
                    complete: (anim) => {
                        document.querySelector('.container').remove();
                    }
                })

                setTimeout(function () {
                    section.appendChild(doc.querySelector('.container'));
                    if (page === 'project.html') {
                        var elem = document.querySelector('.container .grid');
                        var msnry = new Masonry(elem, {
                            // options
                            itemSelector: '.grid-item',
                            columnWidth: 10
                        });
                        imagesLoaded(elem).on('progress', function () {
                            // layout Masonry after each image loads
                            msnry.layout();
                            let gridItems = document.querySelectorAll('.grid-item');
                            gridItems.forEach(item => {
                                var i = 0;
                                item.addEventListener('mouseenter', function (event) {
                                    console.log(i);
                                    i++;
                                    return animateImg(item);
                                })
                                item.addEventListener('mouseleave', function (event) {
                                    console.log(i);
                                    i++;
                                    return animateOutImg(item);
                                })
                            })
                        });
                    }
                    anime({
                        targets: '.content',
                        translateX: [-500, 0],
                        opacity: [0, 1],
                        duration: 600,
                        easing: 'linear',
                    })
                }, 600);
            })
    }

    function animateImg(item) {
        let img = item.querySelector('img');
        let cover = item.querySelector('.cover');
        let title = item.querySelector('.info h2');
        console.log(title);
        anime.timeline({

            })

            .add({
                targets: img,
                scale: 1.2,
                duration: 600,
                easing: 'linear'
            })
            .add({
                targets: cover,
                opacity: [0, 0.5],
                duration: 600,
                easing: 'linear',
                offset: '-=600'
            })
            .add({
                targets: title,
                opacity: [0, 1],
                duration: 600,
                easing: 'easeOutExpo',
                translateY: ['30', '0'],
                offset: '-=600'
            })
    }

    function animateOutImg(item) {
        let cover = item.querySelector('.cover');
        let img = item.querySelector('img');
        let title = item.querySelector('.info h2');
        console.log(title);
        anime.timeline({

            })
            .add({
                targets: img,
                scale: 1,
                duration: 600,
                easing: 'linear'
            })
            .add({
                targets: cover,
                opacity: [0.5, 0],
                duration: 600,
                easing: 'linear',
                offset: '-=600'
            })
            .add({
                targets: title,
                opacity: [1, 0],
                duration: 600,
                easing: 'linear',
                offset: '-=600'
            })
    }


});
