 
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('polls/', include('polls.urls')),
    path('starfish/', include('starfish.urls')),
    path('admin/', admin.site.urls),
]
