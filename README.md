
## Cài đặt

1. Clone repository:
    ```sh
    git clone https://github.com/minhphpro/mets-template
    cd mets-template
    ```

2. Cài đặt các dependencies:
    ```sh
    npm install
    ```

3. Tạo file `.env` từ file `.env.example` và cập nhật các biến môi trường:
    ```sh
    cp .env.example .env
    ```

4. Build dự án:
    ```sh
    npm run build
    ```

5. Chạy dự án:
    ```sh
    npm start
    ```

## Scripts

- `npm start`: Chạy dự án với `nodemon`.
- `npm run build`: Build dự án TypeScript.
- `npm run lint`: Kiểm tra linting với ESLint.
- `npm run lint:fix`: Tự động sửa các lỗi linting.
- `npm run prettier`: Kiểm tra định dạng mã nguồn với Prettier.
- `npm run prettier:fix`: Tự động định dạng mã nguồn với Prettier.

## Dependencies

- express
- mongodb
- mongoose
- jsonwebtoken
- bcryptjs
- cloudinary
- cookie-parser
- cors
- dayjs
- dotenv
- multer
- nodemailer
- streamifier
- yup

## Dev Dependencies

- @types/bcryptjs
- @types/cookie-parser
- @types/cors
- @types/express
- @types/jsonwebtoken
- @types/mongoose
- @types/multer
- @types/node
- @types/nodemailer
- @types/streamifier
- @typescript-eslint/eslint-plugin
- eslint
- eslint-config-prettier
- eslint-plugin-prettier
- nodemon
- prettier
- rimraf
- ts-node
- tsconfig-paths
- typescript

## Tác giả

- Minh Pham - [minhphpro@gmail.com](mailto:minhphpro@gmail.com)
