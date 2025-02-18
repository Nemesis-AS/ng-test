pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/Nemesis-AS/ng-test.git'
            }
        }
        stage('Build') {
            steps {
                git 'https://github.com/Nemesis-AS/ng-test.git'
                sh "npm install"
                sh "ng build --configuration=production"
            }

            // post {
            //     success {
            //         sh "cp -r dist/first-app/* ${JENKINS_HOME}/export_files/"
            //     }
            // }
        }
        stage('Test') {
            steps {
                withSonarQubeEnv('My SonarQube Server') {
                    sh 'mvn clean package sonar:sonar'
                }
            }
        }
        stage("Quality Gate") {
            steps {
              timeout(time: 1, unit: 'HOURS') {
                waitForQualityGate abortPipeline: true
              }
            }
        }
        stage("Deploy") {
            steps {
                sh "cp -r dist/first-app/* ${JENKINS_HOME}/export_files/"
            }
        }
    }
}
