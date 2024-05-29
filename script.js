// Inisialisasi data dan local storage
if (!localStorage.getItem('requestsPerSecond')) {
    localStorage.setItem('requestsPerSecond', JSON.stringify([]));
}

// Fungsi untuk menambah data request per detik
function addRequestData() {
    const now = new Date().getTime();
    let data = JSON.parse(localStorage.getItem('requestsPerSecond'));

    // Hapus data yang lebih lama dari 60 detik
    data = data.filter(entry => now - entry.time < 60000);

    // Tambahkan data baru
    data.push({ time: now, value: 1 });
    localStorage.setItem('requestsPerSecond', JSON.stringify(data));

    updateChart();
}

// Fungsi untuk memperbarui chart
function updateChart() {
    const data = JSON.parse(localStorage.getItem('requestsPerSecond'));
    const now = new Date().getTime();

    // Hitung jumlah request per detik dalam 60 detik terakhir
    let requestsPerSecond = new Array(60).fill(0);
    data.forEach(entry => {
        const secondsAgo = Math.floor((now - entry.time) / 1000);
        if (secondsAgo < 60) {
            requestsPerSecond[59 - secondsAgo] += 1;
        }
    });

    myChart.data.datasets[0].data = requestsPerSecond;
    myChart.update();
}

// Setup Chart.js
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: Array.from({ length: 60 }, (_, i) => i + 1).reverse(),
        datasets: [{
            label: 'Requests per Second',
            data: new Array(60).fill(0),
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false
        }]
    },
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Seconds Ago'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Requests'
                },
                beginAtZero: true
            }
        }
    }
});

// Simpan data setiap kali halaman dimuat atau direfresh
window.addEventListener('load', addRequestData);

// Perbarui grafik setiap detik
setInterval(updateChart, 1000);
