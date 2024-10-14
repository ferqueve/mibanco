// Obtener información del usuario del localStorage
const userInfo = JSON.parse(localStorage.getItem('currentUser'));

// Verificar si el usuario está logueado
if (!userInfo) {
    window.location.href = 'login.html';
}

// Actualizar la información en la página
document.getElementById('welcome-message').textContent = `Bienvenido, ${userInfo.Nombre} ${userInfo.Apellido}`;
document.getElementById('username').textContent = userInfo.Username;
document.getElementById('fernanditos').textContent = userInfo.fernanditos;

// Crear el gráfico
const ctx = document.getElementById('fernanditos-chart').getContext('2d');
new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr'],
        datasets: [{
            label: 'Fernanditos',
            data: [
                userInfo.fernanditos * 0.8,
                userInfo.fernanditos * 0.9,
                userInfo.fernanditos * 0.95,
                userInfo.fernanditos
            ],
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Manejar el cierre de sesión
document.getElementById('logout-btn').addEventListener('click', function() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
});
