document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        fetch('https://ferqueve.github.io/mibanco/api/295.json')
            .then(response => response.json())
            .then(usuarios => {
                const user = usuarios.find(u => u.Username === username && u.Password === password);
                
                if (user) {
                    // Almacenar información del usuario (excepto la contraseña) en localStorage
                    const { Password, ...userInfo } = user;
                    localStorage.setItem('currentUser', JSON.stringify(userInfo));
                    
                    // Redirigir al dashboard
                    window.location.href = 'dashboard.html';
                } else {
                    alert('Usuario o contraseña incorrectos');
                }
            })
            .catch(error => {
                console.error('Error al obtener datos de usuarios:', error);
                alert('Hubo un problema al intentar iniciar sesión. Por favor, inténtelo de nuevo más tarde.');
            });
    });
});