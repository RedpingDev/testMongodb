# MongoDB와 Docker를 사용한 JSON 데이터 저장 예제

**Release Date:** 2025-09-24

이 프로젝트는 Docker와 MongoDB를 사용하여 JSON 형태의 데이터를 저장하는 간단한 예제입니다.

## 필요 조건

- [Docker](https://www.docker.com/get-started) 설치
- [Docker Compose](https://docs.docker.com/compose/install/) 설치
- [Node.js](https://nodejs.org/) 설치 (선택 사항, 애플리케이션 실행 시 필요)

## 설치 및 실행 방법

### 1. MongoDB 컨테이너 실행

다음 명령어로 Docker Compose를 사용하여 MongoDB와 Mongo Express를 실행합니다:

```bash
docker-compose up -d
```

이 명령어는 다음 서비스를 실행합니다:
- MongoDB: 포트 27017에서 실행
- Mongo Express (웹 기반 MongoDB 관리 도구): 포트 8081에서 실행

### 2. Node.js 애플리케이션 실행 (선택 사항)

애플리케이션을 실행하려면 다음 명령어를 사용합니다:

```bash
# 필요한 패키지 설치
npm install

# 애플리케이션 실행
npm start
```

## 서비스 접속 정보

- **MongoDB**: `mongodb://root:example@localhost:27017`
  - 사용자 이름: `root`
  - 비밀번호: `example`

- **Mongo Express**: `http://localhost:8081`
  - 사용자 이름: `root`
  - 비밀번호: `example`

## API 엔드포인트

애플리케이션을 실행한 경우 다음 API 엔드포인트를 사용할 수 있습니다:

- **JSON 데이터 저장**: `POST /api/documents`
  ```bash
  curl -X POST http://localhost:3000/api/documents \
    -H "Content-Type: application/json" \
    -d '{"title": "테스트 문서", "content": "내용", "tags": ["test"]}'
  ```

- **JSON 데이터 조회**: `GET /api/documents`
  ```bash
  curl http://localhost:3000/api/documents
  ```

## 서비스 중지

다음 명령어로 Docker 컨테이너를 중지할 수 있습니다:

```bash
docker-compose down
```

데이터를 완전히 삭제하려면 볼륨도 함께 삭제합니다:

```bash
docker-compose down -v
```