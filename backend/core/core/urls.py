from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1.0/user/', include('userAPI.urls')),
    path('api/v1.0/app/', include('appSettings.urls')),
    path('api/v1.0/user/', include('reminders.urls'))
]

# localhost:8000/admin/
# localhost:8000/api/v1.0/user/