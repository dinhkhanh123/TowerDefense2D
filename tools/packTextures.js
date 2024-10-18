const fs = require('fs');
const path = require('path');
const { packAsync } = require('free-tex-packer-core');

const rawAtlasPath = './assets/raw_atlas';

// Hàm lấy danh sách các file ảnh trong một thư mục
function getImagesFromDir(dirPath) {
    const files = fs.readdirSync(dirPath);
    return files.map(file => ({
        path: file,
        contents: fs.readFileSync(path.join(dirPath, file))
    }));
}

// Hàm để loại bỏ phần mở rộng từ tên file
function removeFileExtension(fileName) {
    return fileName.replace(/\.[^/.]+$/, ""); 
}

// Hàm đóng gói ảnh thành atlas
async function packImagesForDir(dirName) {
    try {
        const dirPath = path.join(rawAtlasPath, dirName);

        // Lấy danh sách file ảnh trong thư mục
        let images = getImagesFromDir(dirPath);

        // Loại bỏ phần mở rộng khỏi tên file trước khi đóng gói
        images = images.map(image => ({
            path: removeFileExtension(image.path), // Loại bỏ phần mở rộng
            contents: image.contents
        }));

        // Đọc cấu hình atlas từ file atlasConfig.json
        const configPath = './assets/raw_atlas/atlasConfig.json';
        const atlasConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));

        const options = { ...atlasConfig.options, textureName: dirName + '_atlas' }; 

        // Đóng gói ảnh với các tùy chọn trong cấu hình
        const files = await packAsync(images, options);

        // Lưu file atlas vào thư mục assets/atlas
        const outputDir = './assets/atlas';
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }
        files.forEach(file => {
            const outputPath = path.join(outputDir, file.name);
            fs.writeFileSync(outputPath, file.buffer);
            console.log(`Saved: ${outputPath}`);
        });

    } catch (error) {
        console.error(`Error packing images for directory ${dirName}:`, error);
    }
}

// Hàm chính để duyệt qua các thư mục con và đóng gói ảnh
async function packAllDirectories() {
    const directories = fs.readdirSync(rawAtlasPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    for (const dir of directories) {
        await packImagesForDir(dir);
    }
}

packAllDirectories();