@Library('fizen-shared-libraries') _

pipeline {
    agent any

    stages {
      stage('Get commit details') {
        steps {
          script {
            env.GIT_AUTHOR = sh(
              script: "git --no-pager show -s --format='%an'",
              returnStdout: true
            ).trim()
          }
        }
      }
      stage("Pre build") {
        steps {
          notifyTelegram "STARTED"
          sh "rm -rf .env.production"
          sh "git submodule sync"
          sh "git submodule update --init --recursive"
        }
      }
      stage('Build') {
        steps {
          sh "printenv > .env.production"
          sh "echo Building the Docker image..."
          sh "sudo docker build -t $REPOSITORY_URI:latest -f production.Dockerfile ."
          sh "sudo docker tag $REPOSITORY_URI:latest $REPOSITORY_URI:$GIT_COMMIT"
        }
      }
      stage('Deploy') {
        when {
          expression {
            currentBuild.result == null || currentBuild.result == 'SUCCESS' 
          }
        }
        steps {
          echo "Deploying the Docker image..."
          sh "sudo docker network create $NETWORK || true"
          sh "sudo docker stop $CONTAINER_NAME || true && sudo docker rm $CONTAINER_NAME || true"
          sh "sudo docker run -d --name $CONTAINER_NAME \
                -p $MACHINE_PORT:$PORT \
                -p $MACHINE_GRPC_PORT:$GRPC_PORT \
                --restart unless-stopped \
                --env-file .env.production \
                --network=$NETWORK $REPOSITORY_URI:$GIT_COMMIT"
        }
      }
    }
    post {
      success {
        notifyTelegram "SUCCESS"
      }
      failure {
        notifyTelegram "ERROR"
      }
    }
}
