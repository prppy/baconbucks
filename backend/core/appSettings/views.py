from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Settings

class SettingsView(APIView):
    def get(self, request, format=None):

        settingDict = {}
            
        try: 
            settingObjects = Settings.objects.all()
            for setting in settingObjects:
                settingDict[setting.name] = setting.value

            return Response(settingDict, status=200)
        
        except:
            return Response(status=404)
        
    def post(self, request, format=None):
        # create new settings in the database with this view

        settings = request.data['settings'] 
        # request.data is a dictionary. 
        # request.data['settings'] is used to extract the value of the dict w the key 'settings'
        bad_settings = []
        
        for setting in settings:
            try:
                new_setting = Settings(name=setting['NAME'], value=setting['VALUE'])
                new_setting.save()

            except:
                bad_settings.append(setting)

        if len(bad_settings) > 0:
            return Response({"INVALID SETTINGS": bad_settings}, status=200)
        
        return Response(status=200)