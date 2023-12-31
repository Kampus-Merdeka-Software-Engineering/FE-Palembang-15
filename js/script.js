document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.getElementsByClassName('tombol');
        for (const button of buttons) {
        button.addEventListener('mouseover', function() {
            button.style.transition = 'background-color 0.3s, color 0.3s';
            button.style.backgroundColor = '#8E4898';
            button.style.boxShadow = '0 0 20px rgba(207, 96, 220, 0.4)';
            button.style.color = 'white';
        });
        button.addEventListener('mouseout', function() {
            button.style.backgroundColor = '';
            button.style.color = '';
            button.style.boxShadow = '';
        });
    }
});

function handleHover(memberCard) {
    memberCard.addEventListener('mouseover', function() {
        memberCard.style.transition = 'color 0.5s, transform 0.3s';
        memberCard.style.color = 'white';
        memberCard.style.transform = 'scale(1.07)';
    });

    memberCard.addEventListener('mouseout', function() {
        memberCard.style.color = '';
        memberCard.style.transform = '';
    });
}


// untuk pass nilai url dari click courses di index atao elearning
function redirectToVideo(courseId) {
    window.location.href = `Video_E-Learning.html?courseId=${courseId}&episode=1`;
}

// utk pass url dari click episode content
function tampilinVideo(courseId, episode) {
    window.location.href = `Video_E-Learning.html?courseId=${courseId}&episode=${episode}`;
}

//untuk index.html
//munculin 4 course terpopuler
const getPopularCourses = async () => {
    const response = await fetch("https://broad-minute-production.up.railway.app/courses/popular");
    const responseData = await response.json();
    const popularCourses = responseData.data;
    const coursebox1 = document.querySelector(".coursebox1");

    popularCourses.forEach((course) => {
        const courseDiv = document.createElement("div");
        courseDiv.classList.add("coursebox2");

        courseDiv.addEventListener('click', () => {
            redirectToVideo(course.id);
        });

        courseDiv.innerHTML = `
            <div class="course-content">
                <div class="img">
                    <img src="${course.thumbnail}" alt="" referrerpolicy="no-referrer">
                </div>
                <h4 class="namecourse">${course.judulCourse}</h4>
                <p class="upskill">Skill yang diperoleh: ${course.skillDiperoleh}</p>
                <p>${course.rating} ⭐ (${course.ulasan}) <br>
                    ${course.tingkat} Professional Certificate</p>
            </div>`;

        coursebox1.appendChild(courseDiv);
    });
};

//munculin testimonial yang diisi dari about.html
const showTestimonials = async () => {
    const response = await fetch('https://broad-minute-production.up.railway.app/testimonials');
    const responseData = await response.json();
    const testimonialsData = responseData.data;
    const testimonialContainer = document.getElementById('comment-box');

    testimonialsData.forEach((testimonial) => {
        const testimonialDiv = document.createElement('div');
        testimonialDiv.classList.add("comment-container");

        testimonialDiv.innerHTML = `
            <div class="commentid">
                <div class="comment-name">
                    <h3>${testimonial.nama}</h3>
                    <p class="comment-jabatan">${testimonial.jabatan}</p>
                </div>
            </div>
            <p class="comment-desc">${testimonial.testimoni}</p>
        `;

        testimonialContainer.appendChild(testimonialDiv);
    })
}

//untuk e-learning.html
//munculin semuaa courses yang ada
const getCourses = async () => {
    const response = await fetch("https://broad-minute-production.up.railway.app/courses");
    const responseData = await response.json();
    const courses = responseData.data;
    const coursebox1 = document.querySelector(".coursebox1");

    courses.forEach((course) => {
        const courseDiv = document.createElement("div");
        courseDiv.classList.add("coursebox2");

        courseDiv.addEventListener('click', () => {
            redirectToVideo(course.id);
        });

        courseDiv.innerHTML = `
            <div class="course-content">
                <div class="img">
                    <img src="${course.thumbnail}" alt="" referrerpolicy="no-referrer">
                </div>
                <h4 class="namecourse">${course.judulCourse}</h4>
                <p class="upskill">Skill yang diperoleh: ${course.skillDiperoleh}</p>
                <p>${course.rating} ⭐ (${course.ulasan}) <br>
                    ${course.tingkat} Professional Certificate</p>
            </div>`;

        coursebox1.appendChild(courseDiv);
    });
};

//untuk yang about.html
//submit testimonial
const handleSubmitForm = (event) => {
    event.preventDefault();

    fetch("https://broad-minute-production.up.railway.app/testimonials", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nama: document.getElementById("nama").value,
            jabatan: document.getElementById("jabatan").value,
            perusahaan: document.getElementById("perusahaan").value,
            email: document.getElementById("email").value,
            layanan: document.getElementById("layanan").value,
            testimoni: document.getElementById("testimoni").value,
        }),
    })
    .then(() => {
        window.location.reload();
    });
};


//untuk di video_e-learning.html
//utk munculin video content, list content, judul sama deskripsi. trus sama komentar
const loadCourseContent = async (courseId, episode) => {
    //ini untuk munculin detail sesuai contentnya dr courseid sama episode (video, judul, dan deskripsi)
    const response = await fetch(`https://broad-minute-production.up.railway.app/contents/${courseId}/${episode}`);
    const responseData = await response.json();

    const ContentData = responseData.data[0];
    const videoUrl = ContentData.video;
    document.getElementById('courseVideo').src = videoUrl;

    const judulContent = ContentData.judulContent;
    document.getElementById('judul-content').innerHTML = judulContent;

    const deskripsiContent = ContentData.deskripsi;
    document.getElementById('deskripsi').innerHTML = deskripsiContent;

    contentId = ContentData.id;

    //dari sini untuk show list course content dari courseid
    const responseAll = await fetch(`https://broad-minute-production.up.railway.app/contents/courses/${courseId}`);
    const responseAllData = await responseAll.json();
    const AllContents = responseAllData.data;

    const courseList = document.getElementById('courseList');

    AllContents.forEach((content, index) => {
        const contentItem = document.createElement('div');
        contentItem.classList.add("course-item");

        contentItem.innerHTML = `
            <div class="list-content2" onclick="tampilinVideo(${content.CourseId}, ${content.episode})">
                <h2>0${index + 1}</h2>
                <div class="course-details">
                    <p class="course-title">${content.judulContent}</p>
                </div>
            </div>`;
        courseList.appendChild(contentItem);

        if (index < AllContents.length - 1) {
            const hrElement = document.createElement('hr');
            hrElement.classList.add("course-divider");
            courseList.appendChild(hrElement);
        }
    });

    //ini untuk komentarnya
    const responseKomentar = await fetch(`https://broad-minute-production.up.railway.app/comments/contents/${contentId}`)
    const responseAllKomentar = await responseKomentar.json();
    const AllKomentar = responseAllKomentar.data;
    
    const commentsRow = document.getElementById("comments-row");

    if (AllKomentar.length === 0){
        const noComments = document.getElementById("no-comment-message");
        noComments.innerHTML = `
            <img src="image/comment.jpg" alt="Comment Image">
            <p class="no-comment-p">Belum ada komentar. Jadi yang pertama untuk komentar dalam video content ${judulContent} !</p>
        `

    } else {
        //show komentar sesuai yang dipili
        AllKomentar.forEach((komentar) => {
            const komentarDiv = document.createElement("div");
            komentarDiv.classList.add("comment-container");

            komentarDiv.innerHTML = `
                <h3>${komentar.nama}</h3>
                <p class="comment-jabatan">${komentar.jabatan}</p>
                <p class="comment-desc">${komentar.komentar}</p>
            `;
            commentsRow.appendChild(komentarDiv);
        });
    }
};

//untuk submit komentar
const handleSubmitFormKomentar = (event) => {
    event.preventDefault();
    fetch("https://broad-minute-production.up.railway.app/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nama: document.getElementById("nama").value,
            email: document.getElementById("email").value,
            jabatan: document.getElementById("jabatan").value,
            komentar: document.getElementById("komentar").value,
            ContentId: contentId,
        }),
    })
    .then(() => {
        window.location.reload();
    })
};

// untuk branding e-learning
function slideImage(imageNumber) {
    // Mendapatkan referensi ke elemen gambar
    var images = document.querySelectorAll(".slide-image");

    // Menghapus kelas slide-in dari semua gambar
    images.forEach(function(image) {
        image.classList.remove("slide-in");
        image.classList.add("slide-out");
    });

    // Menghapus kelas slide-out dari gambar yang sesuai dan menambahkan kelas slide-in
    var selectedImage = document.getElementById("myimage" + imageNumber);
    if (selectedImage) {
        selectedImage.classList.remove("slide-out");
        selectedImage.classList.add("slide-in");
    }
}
