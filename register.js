/**
 * Sistema de Registro de Usuario - Tecommers
 * Validación completa con HTML5 y JavaScript
 */

class TecommersRegister {
    constructor() {
        this.form = document.getElementById('registerForm');
        this.successModal = document.getElementById('successModal');
        this.countdownElement = document.getElementById('countdown');
        this.submitBtn = document.getElementById('submitBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.continueBtn = document.getElementById('continueBtn');
        
        // Estado del formulario
        this.isSubmitting = false;
        this.countdown = 5;
        this.countdownInterval = null;
        
        // Inicializar
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupPasswordToggle();
        this.setupPasswordStrength();
        this.setupRealTimeValidation();
        
        // Configurar fecha máxima (18 años)
        this.setMaxBirthDate();
    }
    
    setupEventListeners() {
        // Evento submit del formulario
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
        
        // Botón reset
        this.resetBtn.addEventListener('click', () => {
            this.resetForm();
        });
        
        // Botón continuar en modal de éxito
        this.continueBtn.addEventListener('click', () => {
            this.redirectToAccount();
        });
    }
    
    setupPasswordToggle() {
        document.querySelectorAll('.toggle-password').forEach(button => {
            button.addEventListener('click', (e) => {
                this.togglePasswordVisibility(e);
            });
        });
    }
    
    setupPasswordStrength() {
        const passwordInput = document.getElementById('password');
        const strengthBar = document.querySelector('.strength-bar');
        
        passwordInput.addEventListener('input', () => {
            const password = passwordInput.value;
            this.updatePasswordStrength(password);
            this.validatePasswordRequirements(password);
        });
    }
    
    setupRealTimeValidation() {
        // Validar campo al perder el foco
        const inputs = this.form.querySelectorAll('input[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input.id);
            });
            
            // Validación en tiempo real para el nombre (para detectar números inmediatamente)
            if (input.id === 'nombre') {
                input.addEventListener('input', () => {
                    const value = input.value;
                    // Si hay algún número, mostrar error y quitar clase 'valid'
                    if (/\d/.test(value)) {
                        this.showError('nombre', 'El nombre no puede contener números');
                        input.classList.remove('valid');
                        input.classList.add('invalid');
                    } else if (value.length >= 3) {
                        // Si no hay números y tiene al menos 3 caracteres, quitar error
                        if (this.hasError('nombre') && !/\d/.test(value)) {
                            this.hideError('nombre');
                            input.classList.remove('invalid');
                            if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
                                input.classList.add('valid');
                            }
                        }
                    } else {
                        // Si tiene menos de 3 caracteres, quitar clase 'valid'
                        input.classList.remove('valid');
                    }
                });
            } else {
                // Para otros campos, solo limpiar error
                input.addEventListener('input', () => {
                    if (this.hasError(input.id)) {
                        this.hideError(input.id);
                    }
                });
            }
        });
        
        // Validar coincidencia de contraseñas en tiempo real
        const confirmPassword = document.getElementById('confirmPassword');
        confirmPassword.addEventListener('input', () => {
            this.validatePasswordMatch();
        });
        
        // Validar checkbox de términos
        const terminos = document.getElementById('terminos');
        terminos.addEventListener('change', () => {
            this.validateField('terminos');
        });
    }
    
    setMaxBirthDate() {
        // Calcular fecha máxima (18 años atrás)
        const today = new Date();
        const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
        document.getElementById('fechaNacimiento').max = maxDate.toISOString().split('T')[0];
    }
    
    togglePasswordVisibility(event) {
        const button = event.currentTarget;
        const targetId = button.dataset.target;
        const passwordInput = document.getElementById(targetId);
        const icon = button.querySelector('.material-symbols-outlined');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.textContent = 'visibility_off';
        } else {
            passwordInput.type = 'password';
            icon.textContent = 'visibility';
        }
    }
    
    updatePasswordStrength(password) {
        const strengthBar = document.querySelector('.strength-bar');
        const strengthText = document.querySelector('.strength-text');
        
        if (!password) {
            strengthBar.style.width = '0%';
            strengthBar.style.backgroundColor = '';
            strengthText.textContent = 'Seguridad de la contraseña';
            strengthText.style.color = '';
            return;
        }
        
        let score = 0;
        const requirements = [
            password.length >= 8,
            /[A-Z]/.test(password),
            /[a-z]/.test(password),
            /[0-9]/.test(password),
            /[@$!%*?&]/.test(password)
        ];
        
        score = requirements.filter(Boolean).length;
        
        // Actualizar barra de fuerza
        const percentage = (score / 5) * 100;
        strengthBar.style.width = `${percentage}%`;
        
        // Actualizar color y texto según la fuerza
        if (score <= 1) {
            strengthBar.style.backgroundColor = '#ef4444'; // Rojo
            strengthText.textContent = 'Muy débil';
            strengthText.style.color = '#ef4444';
        } else if (score === 2) {
            strengthBar.style.backgroundColor = '#f59e0b'; // Naranja
            strengthText.textContent = 'Débil';
            strengthText.style.color = '#f59e0b';
        } else if (score === 3) {
            strengthBar.style.backgroundColor = '#3b82f6'; // Azul
            strengthText.textContent = 'Aceptable';
            strengthText.style.color = '#3b82f6';
        } else if (score === 4) {
            strengthBar.style.backgroundColor = '#10b981'; // Verde
            strengthText.textContent = 'Buena';
            strengthText.style.color = '#10b981';
        } else {
            strengthBar.style.backgroundColor = '#059669'; // Verde oscuro
            strengthText.textContent = 'Excelente';
            strengthText.style.color = '#059669';
        }
    }
    
    validatePasswordRequirements(password) {
        const requirements = [
            { rule: 'length', test: password.length >= 8, message: 'Al menos 8 caracteres' },
            { rule: 'uppercase', test: /[A-Z]/.test(password), message: 'Una letra mayúscula' },
            { rule: 'lowercase', test: /[a-z]/.test(password), message: 'Una letra minúscula' },
            { rule: 'number', test: /[0-9]/.test(password), message: 'Un número' },
            { rule: 'special', test: /[@$!%*?&]/.test(password), message: 'Un carácter especial (@$!%*?&)' }
        ];
        
        requirements.forEach(req => {
            const li = document.querySelector(`[data-rule="${req.rule}"]`);
            const icon = li.querySelector('.requirement-icon');
            
            if (req.test) {
                li.classList.add('valid');
                icon.textContent = 'check_circle';
                icon.style.color = '#10b981';
            } else {
                li.classList.remove('valid');
                icon.textContent = 'cancel';
                icon.style.color = '#ef4444';
            }
        });
    }
    
    async handleSubmit() {
        // Prevenir múltiples envíos
        if (this.isSubmitting) return;
        
        // Validar formulario
        if (!this.validateForm()) {
            return;
        }
        
        // Cambiar estado del botón
        this.isSubmitting = true;
        this.submitBtn.disabled = true;
        this.submitBtn.innerHTML = `
            <span class="material-symbols-outlined btn-icon">sync</span>
            Procesando...
        `;
        
        // Simular procesamiento (en producción sería una llamada AJAX)
        await this.simulateSubmit();
        
        // Mostrar mensaje de éxito
        this.showSuccessMessage();
    }
    
    validateForm() {
        let isValid = true;
        
        // Validar campos individuales
        const fields = ['nombre', 'email', 'telefono', 'fechaNacimiento', 'password', 'captcha', 'terminos'];
        
        fields.forEach(fieldId => {
            if (!this.validateField(fieldId)) {
                isValid = false;
            }
        });
        
        // Validar coincidencia de contraseñas
        if (!this.validatePasswordMatch()) {
            isValid = false;
        }
        
        return isValid;
    }
    
    validateField(fieldId) {
        const field = document.getElementById(fieldId);
        let value;
        
        if (field.type === 'checkbox') {
            value = field.checked;
        } else {
            value = field.value.trim();
        }
        
        switch(fieldId) {
            case 'nombre':
                return this.validateNombre(value);
            case 'email':
                return this.validateEmail(value);
            case 'telefono':
                return this.validateTelefono(value);
            case 'fechaNacimiento':
                return this.validateFechaNacimiento(value);
            case 'password':
                return this.validatePassword(value);
            case 'confirmPassword':
                return this.validatePasswordMatch();
            case 'captcha':
                return this.validateCaptcha(value);
            case 'terminos':
                return this.validateTerminos(value);
            default:
                return true;
        }
    }
    
    validateNombre(value) {
        const nombreInput = document.getElementById('nombre');
        
        if (!value) {
            this.showError('nombre', 'El nombre completo es obligatorio');
            nombreInput.classList.remove('valid');
            return false;
        }
        
        if (value.length < 3) {
            this.showError('nombre', 'El nombre debe tener al menos 3 caracteres');
            nombreInput.classList.remove('valid');
            return false;
        }
        
        if (value.length > 100) {
            this.showError('nombre', 'El nombre es demasiado largo');
            nombreInput.classList.remove('valid');
            return false;
        }
        
        // Verificar si hay números en el nombre
        if (/\d/.test(value)) {
            this.showError('nombre', 'El nombre no puede contener números');
            nombreInput.classList.remove('valid');
            return false;
        }
        
        // Verificar si hay caracteres especiales no permitidos
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
            this.showError('nombre', 'El nombre solo puede contener letras y espacios');
            nombreInput.classList.remove('valid');
            return false;
        }
        
        // Verificar que tenga al menos un espacio (nombre y apellido)
        if (!/\s/.test(value)) {
            this.showError('nombre', 'Por favor ingresa nombre y apellido');
            nombreInput.classList.remove('valid');
            return false;
        }
        
        // Verificar que no tenga espacios múltiples consecutivos
        if (/\s{2,}/.test(value)) {
            this.showError('nombre', 'No uses espacios múltiples consecutivos');
            nombreInput.classList.remove('valid');
            return false;
        }
        
        this.hideError('nombre');
        nombreInput.classList.remove('invalid');
        nombreInput.classList.add('valid');
        return true;
    }
    
    validateEmail(value) {
        const emailInput = document.getElementById('email');
        
        if (!value) {
            this.showError('email', 'El correo electrónico es obligatorio');
            emailInput.classList.remove('valid');
            return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            this.showError('email', 'Ingresa un correo electrónico válido (ejemplo@correo.com)');
            emailInput.classList.remove('valid');
            return false;
        }
        
        this.hideError('email');
        emailInput.classList.remove('invalid');
        emailInput.classList.add('valid');
        return true;
    }
    
    validateTelefono(value) {
        const telefonoInput = document.getElementById('telefono');
        
        if (!value) {
            this.showError('telefono', 'El teléfono es obligatorio');
            telefonoInput.classList.remove('valid');
            return false;
        }
        
        if (!/^[0-9]{10}$/.test(value)) {
            this.showError('telefono', 'El teléfono debe tener exactamente 10 dígitos');
            telefonoInput.classList.remove('valid');
            return false;
        }
        
        this.hideError('telefono');
        telefonoInput.classList.remove('invalid');
        telefonoInput.classList.add('valid');
        return true;
    }
    
    validateFechaNacimiento(value) {
        const fechaInput = document.getElementById('fechaNacimiento');
        
        if (!value) {
            this.showError('fechaNacimiento', 'La fecha de nacimiento es obligatoria');
            fechaInput.classList.remove('valid');
            return false;
        }
        
        const birthDate = new Date(value);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        if (age < 18) {
            this.showError('fechaNacimiento', 'Debes ser mayor de 18 años para registrarte');
            fechaInput.classList.remove('valid');
            return false;
        }
        
        this.hideError('fechaNacimiento');
        fechaInput.classList.remove('invalid');
        fechaInput.classList.add('valid');
        return true;
    }
    
    validatePassword(value) {
        const passwordInput = document.getElementById('password');
        
        if (!value) {
            this.showError('password', 'La contraseña es obligatoria');
            passwordInput.classList.remove('valid');
            return false;
        }
        
        if (value.length < 8) {
            this.showError('password', 'La contraseña debe tener al menos 8 caracteres');
            passwordInput.classList.remove('valid');
            return false;
        }
        
        const requirements = [
            { regex: /[A-Z]/, message: 'Debe incluir al menos una letra mayúscula' },
            { regex: /[a-z]/, message: 'Debe incluir al menos una letra minúscula' },
            { regex: /[0-9]/, message: 'Debe incluir al menos un número' },
            { regex: /[@$!%*?&]/, message: 'Debe incluir al menos un carácter especial (@$!%*?&)' }
        ];
        
        for (const req of requirements) {
            if (!req.regex.test(value)) {
                this.showError('password', req.message);
                passwordInput.classList.remove('valid');
                return false;
            }
        }
        
        this.hideError('password');
        passwordInput.classList.remove('invalid');
        passwordInput.classList.add('valid');
        return true;
    }
    
    validatePasswordMatch() {
        const confirmInput = document.getElementById('confirmPassword');
        
        if (!confirmInput) {
            this.showError('confirmPassword', 'Debes confirmar tu contraseña');
            return false;
        }
        
        const password = document.getElementById('password').value;
        const confirmPassword = confirmInput.value;
        
        if (!confirmPassword) {
            this.showError('confirmPassword', 'Debes confirmar tu contraseña');
            confirmInput.classList.remove('valid');
            return false;
        }
        
        if (password !== confirmPassword) {
            this.showError('confirmPassword', 'Las contraseñas no coinciden');
            confirmInput.classList.remove('valid');
            return false;
        }
        
        this.hideError('confirmPassword');
        confirmInput.classList.remove('invalid');
        confirmInput.classList.add('valid');
        return true;
    }
    
    validateCaptcha(value) {
        const captchaInput = document.getElementById('captcha');
        
        if (!value) {
            this.showError('captcha', 'Debes responder la pregunta de seguridad');
            captchaInput.classList.remove('valid');
            return false;
        }
        
        if (parseInt(value) !== 12) {
            this.showError('captcha', 'Respuesta incorrecta. ¿Cuánto es 7 + 5?');
            captchaInput.classList.remove('valid');
            return false;
        }
        
        this.hideError('captcha');
        captchaInput.classList.remove('invalid');
        captchaInput.classList.add('valid');
        return true;
    }
    
    validateTerminos(value) {
        const terminosInput = document.getElementById('terminos');
        
        if (!value) {
            this.showError('terminos', 'Debes aceptar los términos y condiciones');
            return false;
        }
        
        this.hideError('terminos');
        return true;
    }
    
    showError(fieldId, message) {
        const errorElement = document.getElementById(`error-${fieldId}`);
        const inputElement = document.getElementById(fieldId);
        
        errorElement.innerHTML = `
            <span class="material-symbols-outlined">error</span>
            ${message}
        `;
        errorElement.classList.add('show');
        
        if (inputElement) {
            inputElement.classList.add('invalid');
            inputElement.classList.remove('valid');
            inputElement.focus();
        }
    }
    
    hideError(fieldId) {
        const errorElement = document.getElementById(`error-${fieldId}`);
        const inputElement = document.getElementById(fieldId);
        
        errorElement.classList.remove('show');
        
        if (inputElement) {
            inputElement.classList.remove('invalid');
        }
    }
    
    hasError(fieldId) {
        const errorElement = document.getElementById(`error-${fieldId}`);
        return errorElement.classList.contains('show');
    }
    
    async simulateSubmit() {
        // Simular tiempo de procesamiento
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 1500);
        });
    }
    
    showSuccessMessage() {
        // Obtener email del usuario
        const email = document.getElementById('email').value;
        document.getElementById('successEmail').textContent = email;
        
        // Mostrar modal
        this.successModal.style.display = 'flex';
        setTimeout(() => {
            this.successModal.classList.add('show');
        }, 10);
        
        // Ocultar formulario
        this.form.style.opacity = '0.5';
        this.form.style.pointerEvents = 'none';
        
        // Iniciar cuenta regresiva
        this.startCountdown();
    }
    
    startCountdown() {
        this.countdown = 5;
        this.countdownElement.textContent = this.countdown;
        
        this.countdownInterval = setInterval(() => {
            this.countdown--;
            this.countdownElement.textContent = this.countdown;
            
            if (this.countdown <= 0) {
                clearInterval(this.countdownInterval);
                this.redirectToAccount();
            }
        }, 1000);
    }
    
    redirectToAccount() {
        clearInterval(this.countdownInterval);
        
        // En un entorno real, esto redirigiría al dashboard
        // window.location.href = '/dashboard.html';
        
        // Por ahora, mostramos un mensaje
        alert('¡Redireccionando a tu cuenta!');
        
        // Restaurar formulario
        this.resetFormState();
    }
    
    resetForm() {
        // Resetear valores del formulario
        this.form.reset();
        
        // Limpiar todos los errores
        document.querySelectorAll('.error-message').forEach(el => {
            el.classList.remove('show');
        });
        
        // Limpiar clases invalid y valid
        document.querySelectorAll('.invalid, .valid').forEach(el => {
            el.classList.remove('invalid');
            el.classList.remove('valid');
        });
        
        // Resetear barra de fuerza de contraseña
        const strengthBar = document.querySelector('.strength-bar');
        strengthBar.style.width = '0%';
        strengthBar.style.backgroundColor = '';
        
        const strengthText = document.querySelector('.strength-text');
        strengthText.textContent = 'Seguridad de la contraseña';
        strengthText.style.color = '';
        
        // Resetear requisitos de contraseña
        document.querySelectorAll('.requirement-item').forEach(li => {
            li.classList.remove('valid');
            const icon = li.querySelector('.requirement-icon');
            icon.textContent = 'cancel';
            icon.style.color = '#ef4444';
        });
        
        // Enfocar primer campo
        document.getElementById('nombre').focus();
        
        // Restaurar estado del botón
        this.resetFormState();
    }
    
    resetFormState() {
        this.isSubmitting = false;
        this.submitBtn.disabled = false;
        this.submitBtn.innerHTML = `
            <span class="material-symbols-outlined btn-icon">person_add</span>
            Crear cuenta
        `;
        
        // Restaurar formulario
        this.form.style.opacity = '';
        this.form.style.pointerEvents = '';
        
        // Ocultar modal
        this.successModal.classList.remove('show');
        setTimeout(() => {
            this.successModal.style.display = 'none';
        }, 300);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const registerSystem = new TecommersRegister();
    
    // Exponer globalmente para debugging
    window.registerSystem = registerSystem;
    
    console.log('Sistema de registro Tecommers inicializado');
});