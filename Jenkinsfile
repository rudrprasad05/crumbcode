pipeline {
    agent any

    environment {
        NEXT_TELEMETRY_DISABLED = '1'
        NODE_ENV = 'production'
        PORT = '3030'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/YOUR_USERNAME/YOUR_REPO.git'
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Restart Application') {
            steps {
                script {
                    // stop previous app if running
                    sh 'pkill -f "node server.js" || true'
                    
                    // launch new build (background)
                    sh 'nohup node server.js > server.log 2>&1 &'
                }
            }
        }
    }
}
