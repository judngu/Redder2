task :run do
  pids = [
    spawn("cd rails && rails s"),
    spawn("cd ember && ./node_modules/.bin/ember server --proxy http://localhost:3000"),
  ]

  trap "INT" do
    Process.kill "INT", *pids
    exit 1
  end

  loop do
    sleep 1
  end
end

task :deploy do
  sh 'git checkout production'
  sh 'git merge rails-served-html -m "Merging master for deployment"'
  sh 'rm -rf rails/public/assets'
  sh 'cd ember && BROCCOLI_ENV=production broccoli build ../rails/public/assets && cd ..'

  unless `git status` =~ /nothing to commit, working directory clean/
    sh 'git add -A'
    sh 'git commit -m "Asset compilation for deployment"'
  end

  sh 'git subtree push -P rails heroku master'

  sh 'git checkout -'
end
