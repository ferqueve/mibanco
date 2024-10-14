// Asumimos que el dataset está disponible como una variable global llamada 'usuarios'
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
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
});
