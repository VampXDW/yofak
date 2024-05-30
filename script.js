const ctx = document.getElementById('myChart').getContext('2d');

const config = {
    type: 'line',
    data: {
        datasets: [{
            label: 'Requests Per Second',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
            lineTension: 0,
            borderDash: [8, 4],
            data: []
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                type: 'realtime',
                realtime: {
                    duration: 20000,  // Menampilkan 20 detik data
                    refresh: 1000,    // Refresh setiap 1 detik
                    delay: 1000,      // Delay untuk sinkronisasi data
                    onRefresh: function(chart) {
                        chart.data.datasets.forEach(function(dataset) {
                            dataset.data.push({
                                x: Date.now(),
                                y: getRequestsPerSecond()  // Dapatkan data request per detik
                            });
                        });
                    }
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Requests Per Second'
                },
                ticks: {
                    beginAtZero: true
                }
            }
        },
        plugins: {
            legend: {
                display: true
            }
        }
    }
};

const myChart = new Chart(ctx, config);

// Fungsi untuk mendapatkan data request per detik
// Anda perlu mengganti ini dengan sumber data aktual
function getRequestsPerSecond() {
    // Simulasi data request per detik, ganti dengan logika Anda
    return Math.floor(Math.random() * 10);
}
