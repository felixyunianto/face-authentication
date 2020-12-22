const video = document.querySelector('#video');
const verify = document.querySelector('#verify');
const ouput = document.querySelector('#output');

const url = 'http://localhost:8080/'

const start = async () => {
    const LabeledFaceDescriptors = await getLabelPhoto();
    const faceMatcher = new faceapi.FaceMatcher(LabeledFaceDescriptors, 0.6);
    const constraints = { video: true };
    navigator.mediaDevices.getUserMedia(constraints).then(stream => {
        video.srcObject = stream;
    });

    verify.addEventListener('click', async () => {
        let canvas = capture(video);
        canvas.onclick = function () {
            window.open(this.toDataURL(image / jpg));
        };

        const detection = await faceapi
            .detectSingleFace(canvas, new faceapi.SsdMobilenetv1Options())
            .withFaceLandmarks()
            .withFaceDescriptor();

        if (detection) {
            const detect = await faceMatcher.findBestMatch(detection.descriptor);
            console.log(detect);
            if (detect._label !== "unknown") {
                Swal.fire({
                    icon: "success",
                    title: "Silahkan masuk",
                    text: detect._label
                });
                localStorage.setItem('login','login')
                
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Anda belum terdaftar",
                    text: "Pastikan wajah pas dengan frame!"
                });
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Tidak terdeteksi",
                text: "Pastikan wajah pas dengan frame!"
            });
        }
    })
}

Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("/models")
]).then(start);



const capture = (video, scaleFactor) => {
    if (scaleFactor == null) {
        scaleFactor = 0.25;
    }
    var w = video.videoWidth * scaleFactor;
    var h = video.videoHeight * scaleFactor;
    var canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, w, h);
    return canvas;
}

const getData = async () => {
    const data = await fetch(url + 'people')
        .then(res => res.json()).then(data => {
            return data.data
        });
    const dataArray = [];

    data.map(data => {
        let blobPhoto = new Blob([new Uint8Array(data.photo.data).buffer]);
        let people = {
            name : data.name,
            photo: blobPhoto
        }

        dataArray.push(people)
    })

    return dataArray;
}

const getLabelPhoto = async () => {
    const data = await getData();
    const labels = data.map(data => {
        return data.name
    });

    return Promise.all(
        labels.map(async (key, value) => {
            const desc = [];
            const img = await faceapi.bufferToImage(data[value].photo);

            const detection = await faceapi
                .detectSingleFace(img, new faceapi.SsdMobilenetv1Options())
                .withFaceLandmarks()
                .withFaceDescriptor();
            
            desc.push(detection.descriptor);

            return new faceapi.LabeledFaceDescriptors(key, desc);
        })
    )
}