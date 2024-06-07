const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

// 设置文件存储目录和文件名
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // 将上传的文件存储到 uploads 文件夹中
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // 使用原始文件名作为上传文件的文件名
  }
})

// 创建 multer 实例并配置文件上传
const upload = multer({ storage: storage });

// 处理根路径的 GET 请求，返回上传文件的 HTML 表单
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 处理文件上传的 POST 请求
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('未选择文件');
  }
  res.send('文件上传成功');
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});
