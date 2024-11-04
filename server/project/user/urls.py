from django.urls import path
from .views import user_list, create_user, user_detail

urlpatterns = [
    path('users/', user_list, name='user-list'), 
    path('users/create/', create_user, name='create-user'), 
    path('users/<int:user_id>/', user_detail, name='user-detail'),  
]
