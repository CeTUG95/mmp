REM This command line starts chrome in local file access mode (security restriction off)
REM Script by Jürgen Lohr , Beuth-HS, Oliver Lietz, lietz@nanocosmos.de

REM set the path to your chrome.exe 
SET CHROME="C:\Users\Administrator2\AppData\Local\Google\Chrome\Application\chrome.exe"
if not exist "%CHROME%" goto err
%CHROME% --allow-file-access-from-files  --enable-usermedia-screen-capturing"%CD%\0_filter_bunt.htm"
goto end
:err
echo.
echo Chrome.exe not found. Please install or set the path in this script
pause
:end
