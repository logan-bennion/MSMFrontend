MainStreet Markets Setup Guide
=============================

This guide will help you set up and run both the backend (Django) and frontend (React Native/Expo) components of MainStreet Markets.

Prerequisites
------------
- Python 3.8 or higher
- Node.js 14 or higher
- npm or yarn
- Git

Backend Setup (Django) Github link: https://github.com/logan-bennion/MSMBackend
--------------------
1. Navigate to the backend directory:
   cd backend

2. Create a Python virtual environment:
   python -m venv myenv

3. Activate the virtual environment:
   # On Windows:
   myenv\Scripts\activate
   # On macOS/Linux:
   source myenv/bin/activate

4. Install required Python packages:
   pip install -r requirements.txt

5. Make and apply database migrations:
   python manage.py makemigrations
   python manage.py migrate

6. Load initial data:
   python manage.py loaddata apps/products/fixtures/initial_data.json
   python manage.py loaddata apps/shops/fixtures/initial_data.json

7. Create a superuser (for admin access):
   python manage.py createsuperuser

8. Start the Django development server:
   python manage.py runserver

The backend should now be running at http://localhost:8000

Frontend Setup (React Native/Expo)
--------------------------------
1. Navigate to the mainstreet-markets directory:
   cd mainstreet-markets

2. Install dependencies:
   npm install
   # or
   yarn install

3. Start the Expo development server:
   npx expo start
   # or
   yarn expo start

4. Running the app:
   - Press 'w' to open in web browser
   - Press 'a' to open in Android emulator (requires Android Studio)
   - Press 'i' to open in iOS simulator (requires Xcode, macOS only)
   - Scan QR code with Expo Go app on your mobile device

Project Structure
---------------
backend/
├── apps/                 # Django apps
│   ├── cart/            # Shopping cart functionality
│   ├── products/        # Product management
│   ├── shops/           # Shop management
│   └── users/           # User management
└── core/                # Django project settings

mainstreet-markets/
├── src/
│   ├── components/      # Reusable React components
│   ├── context/         # React Context providers
│   ├── screens/         # App screens
│   └── services/        # API services

Key Features
-----------
- Product browsing and search
- Shopping cart management
- User authentication
- Shop listings
- Order management

Testing
-------
1. Backend tests:
   cd backend
   python manage.py test

2. Frontend tests:
   cd mainstreet-markets
   npm test
   # or
   yarn test

Common Issues & Solutions
-----------------------
1. Database errors:
   - Delete db.sqlite3
   - Remove all migrations except __init__.py files
   - Run makemigrations and migrate again

2. Port conflicts:
   - Backend: Change port in runserver command (e.g., python manage.py runserver 8001)
   - Frontend: Follow Expo prompts to use alternative port

3. API connection issues:
   - Verify backend is running
   - Check API_URL in frontend config
   - Ensure CORS settings are correct in Django

Environment Variables
-------------------
Backend (.env):
DJANGO_SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

Frontend (.env):
API_URL=http://localhost:8000

Additional Notes
--------------
- The backend uses SQLite for development
- Frontend uses Expo for easier development and testing
- Default development cart ID is 1
- Initial data includes sample products and shops

Support
-------
For issues and support:
1. Check the common issues section above
2. Review Django/React Native docs
3. Create an issue in the repository

Development Commands
------------------
Backend:
- Create new app: python manage.py startapp app_name
- Make migrations: python manage.py makemigrations
- Apply migrations: python manage.py migrate
- Create superuser: python manage.py createsuperuser
- Run server: python manage.py runserver

Frontend:
- Install package: npm install package-name
- Start dev server: npx expo start
- Build for web: npx expo build:web
- Create new component: Create file in appropriate directory

Remember to keep both backend and frontend servers running while developing.
