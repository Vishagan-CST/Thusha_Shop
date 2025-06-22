from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from inference_sdk import InferenceHTTPClient
import base64

client = InferenceHTTPClient(
    api_url="https://detect.roboflow.com",
    api_key="T8HCJEviYZ2gIq7PjcOs"
)

class DetectFaceShape(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request):
        image = request.FILES.get("image")
        if not image:
            return Response({"error": "No image uploaded"}, status=400)

        image_bytes = image.read()
        image_base64 = base64.b64encode(image_bytes).decode('utf-8')

        try:
            result = client.infer(image_base64, model_id="face-shape-detection/1")
        except Exception as e:
            return Response({"error": str(e)}, status=500)

        predictions = result.get("predictions", [])
        face_shape = predictions[0]["class"] if predictions else "Unknown"
        return Response({"face_shape": face_shape})




from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import ContactMessageSerializer
from .models import ContactMessage

@api_view(['POST'])
def submit_contact_message(request):
    serializer = ContactMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Message sent successfully"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def contact_messages_list(request):
    messages = ContactMessage.objects.all().order_by('-created_at')
    serializer = ContactMessageSerializer(messages, many=True)
    return Response(serializer.data)