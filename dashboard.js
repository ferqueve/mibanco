document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Verificar si el usuario está logueado
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }

    // Función para actualizar la información en la página
    function updateDashboard(userInfo) {
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
    }

    // Obtener datos actualizados de la API
    fetch('https://ferqueve.github.io/mibanco/api/295.json')
        .then(response => response.json())
        .then(usuarios => {
            const updatedUserInfo = usuarios.find(u => u.Username === currentUser.Username);
            if (updatedUserInfo) {
                updateDashboard(updatedUserInfo);
            } else {
                console.error('Usuario no encontrado en los datos actualizados');
                alert('Hubo un problema al cargar sus datos actualizados. Por favor, inicie sesión nuevamente.');
                window.location.href = 'login.html';
            }
        })
        .catch(error => {
            console.error('Error al obtener datos actualizados:', error);
            alert('Hubo un problema al cargar sus datos actualizados. Se mostrarán los datos almacenados localmente.');
            updateDashboard(currentUser);
        });

    // Manejar el cierre de sesión
    document.getElementById('logout-btn').addEventListener('click', function() {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });
});




