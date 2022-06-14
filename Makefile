server = dev@51.77.66.184
app_name = mint.needhair.ru

folder = /home/dev/$(app_name)
folder_client_release = ./release_client

folder_project = $(folder)
folder_client_project = $(folder)/client



deploy_mint_landing:
	@rm -rf $(folder_client_release)
	@mkdir $(folder_client_release)
	@echo 'building mint landing'
	@npm run build landing -- --prod
	@cp -r ./dist/apps/landing/ $(folder_client_release)/
	@cp ./apps/landing/ecosystem.config.js $(folder_client_release)
	@mkdir -p $(folder_client_release)/shared/config
	@cp ./nginx.conf $(folder_client_release)/shared/config
	@echo 'Sending to server'
	@rsync -q -z -r -v -e ssh $(folder_client_release)/ $(server):$(folder_client_project)
	@ssh $(server) 'cd $(folder_client_project) && npm install'
	@ssh $(server) 'cd $(folder_client_project) && pm2 delete ./ecosystem.config.js && pm2 start ./ecosystem.config.js'

nginx_restart:
	@echo 'restart nginx'
	@ssh $(server) 'sudo /usr/local/bin/nginx-restart.sh'
