from django.urls import path

from .views import contact_messages_list
from .views import DetectFaceShape
from .views import DetectFaceShape, submit_contact_message



urlpatterns = [
    path("detect/", DetectFaceShape.as_view(), name="detect-face-shape"),
    path('submit/', submit_contact_message, name='submit-contact'),
     path('messages/', contact_messages_list, name='contact-messages-list'),
   
    

]
