const apiService = {
    apiUrl: process.env.NODE_ENV === 'production' ? 'https://shop-back-mh7t.onrender.com' : 'http://localhost:3001',
    async getProducts() {
        const response = await fetch(this.apiUrl + '/api/products');
        const data = await response.json();
        return data;
    }
}

export default apiService