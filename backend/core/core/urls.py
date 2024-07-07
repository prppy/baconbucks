from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/refresh/', TokenRefreshView.as_view()),
    path('api/v1.0/user/', include('userAPI.urls')),
    path('api/v1.0/log/', include('logAPI.urls')),
    path('api/v1.0/quiz/', include('quizAPI.urls')),
]

# localhost:8000/admin/
# localhost:8000/api/v1.0/user/
# localhost:8000/api/v1.0/user/
# localhost:8000/api/v1.0/user/