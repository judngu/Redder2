require 'rake'

task :run do
  pids = [
    spawn('cd backend && rails s'),
    spawn('cd frontend && ./node_modules/.bin/ember server --proxy http://localhost:3000'),
  ]

  trap 'INT' do
    Process.kill 'INT', *pids
    exit 1
  end

  loop do
    sleep 1
  end
end

task :deploy do
  sh 'git checkout production'
  sh 'git merge master -m "Merging master for deployment"'
  sh 'cd frontend && ./node_modules/.bin/ember build --environment=production --output-path=../backend/public/ && cd ..'

  unless `git status` =~ /nothing to commit, working directory clean/
    sh 'git add -A'
    sh 'git commit -m "Asset compilation for deployment"'
  end

  sh 'git subtree push -P backend heroku master'

  sh 'git checkout -'
end
