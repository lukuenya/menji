# Project Overview
As an expert in Python and Django (as specified in @prompt), your goal is to create a scalable, modular backend for the **MENJI** web application. The frontend is well set up and running (@frontend). You will focus on building a backend with Django and PostgreSQL that adheres to modern development standards (RESTful API, modular design, security, and performance).

# Core Functionalities
1. **Blog**:
    - Implement CRUD operations for blog posts.
    - Add categories and tags for better organization.
    - Include a WYSIWYG editor for admin users to manage content.

2. **Donations**:
    - Implement a secure payment gateway integration (e.g., Stripe and PayPal).
    - Track donation history for users.

3. **Geospatial (Interactive War Map)** `(TO IMPLEMENT LATER)`:
    - Integrate ESRI API to display interactive maps focused on the eastern part of the Democratic Republic of Congo (DRC).
    - Add support for geospatial data storage using the PostGIS extension in PostgreSQL to store polygons and metadata for zones.
    - Show real-time data categorized into occupied zones, contested zones, zones under government control, and liberated zones, with a clear legend.
    - Implement a daily update mechanism to synchronize zone changes (e.g., boundary updates, status changes).
    - Allow to fetch data from third-party APIs or data sources (GeoJSON, CSV, etc.) to update the map.
    - Allow authenticated users to:
        - Add new zones to the map.
        - Update existing zones, including geometry and status.
        - Tag zones with details such as events, population impact, or severity.
    - Enable users to download a screenshot of the map for use in social media, websites, or reports.


4. **Contact Form**:
    - Create a form to collect user inquiries (name, email, subject, message).
    - Store inquiries in the database for admin access.
    - Send notifications to the admin's email using Django’s email framework.

5. **User Management**:
    - **Authentication**:
        - Implement Login/Logout.
    - **Registration**:
        - Email verification on registration.
    - **Password Management**:
        - Password reset functionality with secure token-based flow.
        - Enforce strong password policies.
    - **Role-based Access Control (RBAC)**:
        - Define roles for different user types (e.g., admin, user).
        - Restrict access to admin-only features.

# Additional Functionalities (Suggested Enhancements)
1. **API Layer**:
    - Build a RESTful API using Django Rest Framework (DRF) to ensure scalability.
    - Implement token-based authentication (JWT or OAuth2).
    - Create endpoints for all core functionalities for future frontend extensions (e.g., mobile apps).

2. **Admin Dashboard**:
    - Extend Django Admin for better data visualization.
    - Provide quick analytics (e.g., number of blogs, donations received, geospatial data stats).

3. **Performance Optimizations**:
    - Add database indexing for frequently queried fields.
    - Use caching (Redis/Memcached) for blogs, geospatial data, and donation stats.

4. **Security**:
    - Use Django’s CSRF protection for forms.
    - Enforce HTTPS and secure cookies.
    - Implement rate-limiting to prevent abuse of login, registration, and donation APIs.

5. **Internationalization (I18n)**:
    - Enable multilingual support for blogs and the contact form.

6. **Testing**`(TO IMPLEMENT LATER)`:
    - Write unit tests for all core functionalities.
    - Use Django's test framework to ensure integration tests for APIs.

7. **Logging and Monitoring**:
    - Add logging for critical operations (e.g., donations, map updates).
    - Use a tool like Sentry for error monitoring.

# Development Tools
- **Database**: PostgreSQL with PostGIS extension for geospatial features.
- **Django Libraries**:
    - Django Rest Framework (DRF) for API layer.
    - django-allauth for authentication and OAuth support.
    - psycopg3 for PostgreSQL integration.
    - django-crispy-forms for better form styling.
- **Task Queue**: Celery with Redis for asynchronous tasks (e.g., sending emails, donation processing).
- **Testing**: pytest-django for robust test coverage.

# Deliverables
1. A Django backend that integrates seamlessly with the existing frontend.
2. Fully functional API endpoints for all listed functionalities.
3. Comprehensive documentation for setup, deployment, and usage.
4. Unit tests with at least 80% code coverage.

