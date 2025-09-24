const { MongoClient } = require('mongodb');
const express = require('express');

// Express 앱 설정
const app = express();
app.use(express.json());
const port = 3000;

// MongoDB 연결 정보
const uri = 'mongodb://root:example@localhost:27017';
const client = new MongoClient(uri);
const dbName = 'jsonstore';
const collectionName = 'documents';

// MongoDB에 연결하는 함수
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('MongoDB에 성공적으로 연결되었습니다.');
    return client.db(dbName);
  } catch (error) {
    console.error('MongoDB 연결 중 오류 발생:', error);
    process.exit(1);
  }
}

// JSON 데이터 저장 예제
async function saveJsonDocument(db, document) {
  try {
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(document);
    console.log(`문서가 성공적으로 저장되었습니다. ID: ${result.insertedId}`);
    return result;
  } catch (error) {
    console.error('문서 저장 중 오류 발생:', error);
    throw error;
  }
}

// JSON 데이터 조회 예제
async function findJsonDocuments(db, query = {}) {
  try {
    const collection = db.collection(collectionName);
    const documents = await collection.find(query).toArray();
    return documents;
  } catch (error) {
    console.error('문서 조회 중 오류 발생:', error);
    throw error;
  }
}

// 서버 시작
app.listen(port, async () => {
  const db = await connectToMongoDB();
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
  
  // 샘플 JSON 데이터 저장 예제
  const sampleDocument = {
    title: '샘플 문서',
    description: 'MongoDB에 저장된 JSON 문서 예제',
    tags: ['mongodb', 'json', 'example'],
    created_at: new Date(),
    data: {
      value: 42,
      isActive: true,
      items: [1, 2, 3, 4, 5]
    }
  };
  
  try {
    await saveJsonDocument(db, sampleDocument);
    const documents = await findJsonDocuments(db);
    console.log('저장된 모든 문서:', documents);
  } catch (error) {
    console.error('예제 실행 중 오류 발생:', error);
  }
});

// API 엔드포인트 - JSON 데이터 저장
app.post('/api/documents', async (req, res) => {
  try {
    const db = client.db(dbName);
    const result = await saveJsonDocument(db, req.body);
    res.status(201).json({ success: true, id: result.insertedId });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API 엔드포인트 - JSON 데이터 조회
app.get('/api/documents', async (req, res) => {
  try {
    const db = client.db(dbName);
    const documents = await findJsonDocuments(db);
    res.json(documents);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
