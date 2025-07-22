
from rest_framework import serializers

class EncryptedFileUploadSerializer(serializers.Serializer):
    file = serializers.FileField()
    recipient_id = serializers.CharField()
