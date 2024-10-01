# My Expense Tracker

**My Expense Tracker** es una aplicación que permite a los usuarios registrar y controlar sus gastos diarios de manera sencilla. Con un diseño responsivo y moderno, la aplicación facilita la gestión financiera diaria mediante la categorización de gastos y la autenticación de usuarios a través de Firebase.

## Tecnologías

- **React**: Librería de JavaScript para construir interfaces de usuario.
- **Vite**: Herramienta rápida y ligera para el desarrollo de aplicaciones frontend.
- **Firebase**:
  - **Firebase Authentication**: Autenticación de usuarios (registro e inicio de sesión).
  - **Firestore**: Base de datos en tiempo real para almacenar y sincronizar los gastos.
- **Tailwind CSS**: Framework CSS para construir interfaces modernas de manera eficiente.

## Características

- Registro y visualización de gastos diarios.
- Categorías personalizables para los gastos (ej. comida, transporte, entretenimiento, etc.).
- Autenticación de usuarios con Firebase (registro e inicio de sesión).
- Historial de gastos con posibilidad de filtrar por categoría y fecha.
- Diseño completamente responsivo para dispositivos móviles y de escritorio.
  
## Requisitos previos

Asegúrate de tener instalados los siguientes programas en tu entorno de desarrollo:

- **Node.js** (versión 14 o superior)
- **npm** (Node Package Manager) o **yarn**
- **Firebase**: Debes tener una cuenta en Firebase y configurar un proyecto con Firestore y Authentication.

## Configuración del Proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/tuusuario/my-expense-tracker.git
cd my-expense-tracker
```

### 2. Instalar dependencias

Dentro del directorio del proyecto, ejecuta el siguiente comando para instalar todas las dependencias necesarias:

```bash
npm install
```

### 3. Configurar Firebase

1. Ve a Firebase Console y crea un nuevo proyecto.
2. Habilita Firestore para almacenar los gastos y Firebase Authentication para la autenticación de usuarios (utiliza el método de Email/Password).
3. Obtén las credenciales de tu proyecto Firebase y crea un archivo .env en la raíz de tu proyecto con la siguiente configuración:

```bash
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

### 4. Iniciar el servidor de desarrollo

Una vez configurado todo, ejecuta el siguiente comando para iniciar la aplicación en modo de desarrollo:

```bash
npm run dev
```

Esto abrirá la aplicación en <http://localhost:5173> en tu navegador web.
