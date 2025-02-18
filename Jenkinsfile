pipeline {
    agent any
    //  tools {
    //     maven 'M3'
    // }

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
            def scannerHome = tool 'SonarQube Scanner';
            steps {
                withSonarQubeEnv('SonarQube-local') { // If you have configured more than one global server connection, you can specify its name
                    sh "${scannerHome}/bin/sonar-scanner"
                }
                // withSonarQubeEnv('SonarQube-local') {
                //     // sh 'mvn clean package sonar:sonar -Dsonar.projectKey="ng-test" -Dsonar.projectName="NG Test"'
                  
                // }
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
