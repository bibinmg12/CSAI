from django.urls import path 
from . import views
from .views import capture_image
from django.conf import settings
from django.conf.urls.static import static

urlpatterns=[
    path('register_user/',views.register_user,name='register_user'),
    path('reg_disp/',views.user_disp,name='reg_disp'),
    path('login/',views.login_view,name='login'),
    path('login/capture-image/', views.capture_image),
    path('logout/',views.logout_view,name='logout'),
    path('get_user/',views.get_user,name='getuser'),
    path('get_user/update_user/', views.update_user,name='update_user'),
    path('get_failed_login_images/', views.get_failed_login_images, name='get_failed_login_images'),
    path('analyze-media/',views.analyze_media,name='analyze-media'),
    path('results/<str:result_id>/', views.get_analysis_result, name='get_analysis_result'),
    path('mediam/<str:filename>/', views.get_media_file, name='get_media_file'),
    # path('traffic-logs/', views.get_traffic_logs, name='get_traffic_logs'),
    # path('collect_network_traffic/', views.collect_network_traffic, name='collect_network_traffic'),
    # path('view_threats/', views.view_threats, name='view_threats'),
    path("check-email-breaches/", views.check_email_breaches, name="check_email_breaches"),
    path("email-breach-analytics/", views.email_breach_analytics, name="email_breach_analytics"),
    path("check-password-leak/", views.check_password_leak, name="check_password_leak"),

    path('network-traffic/', views.get_network_traffic, name='get_network_traffic'),
    path('system-logs/', views.get_system_logs, name='get_system_logs'),

    path('upload-csv/', views.upload_csv_and_classify, name="upload_csv"),
    path('manual-classify/', views.manual_classify, name='manual_classify'),
    path('analyze-url/', views.analyze_url, name='analyze_phishing_url'),
    path('api/files/', views.get_files, name='get_files'),
    # path('upload-and-encrypt/', views.upload_and_encrypt, name='upload_and_encrypt'),
    # path('fetch-received-files/', views.fetch_received_files, name='fetch_received_files'),
    # path('decrypt-file/', views.decrypt_file_view, name='decrypt_file_view'),
    # path('/api/query/', views.handle_nemotron_query, name='handle_nemotron_query'),
    path('api/threats/', views.get_threats_data, name='get_threats_data'),
    path('fetch-users/', views.fetch_users, name='fetch_users'),
    path('upload-and-encrypt/', views.upload_and_encrypt, name='upload_and_encrypt'),
    path('fetch-received-files/', views.fetch_received_files, name='fetch_received_files'),
    path('decrypt-file/', views.decrypt_file, name='decrypt_file'),
    path('get-file-keys/', views.get_file_keys, name='get_file_keys'),
    path('fetch-file-key/', views.fetch_shared_file_key, name='fetch_shared_file_key'),
    path("send-otp/", views.send_key_access_otp, name="send_key_access_otp"),
    path("verify-otp-key/", views.verify_key_otp, name="verify_key_otp"),
    path('dark_web/', views.dark_web, name='dark_web'),
    path("blocked-ips/", views.get_blocked_ips,name='blocked_ips'),
    path("whitelist-ip/",views.whitelist_ip,name='whitelisted_ips'),
    path("get-whitelisted-ips/", views.get_whitelisted_ips,name='display_whitelisted'),
    path("blocking_whited_ips/", views.blacklist_ip_from_whitelist,name='blacklist_ip_from_whitelist'),
    path('check-session/', views.check_session,name='session_checking'),


    path('generate-password/', views.generate_password, name='generate_password'),
    path("scan-file/", views.scan_file_view, name="scan_file"),
    path("scan-reports/", views.get_user_scans, name="scan_reports"),
    path("test-session/", views.test_session_view, name="scan_reports"),


    

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)




