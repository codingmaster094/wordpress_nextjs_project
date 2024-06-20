export default async function graphqlRequest(query) {
    const url = process.env.NEXT_PUBLIC_API_URL;

    if (!url) {
        throw new Error('API URL is not defined');
    }

    const headers = { 'Content-Type': 'application/json' };
    const token = process.env.NEXT_PUBLIC_WORDPRESS_AUTH_REFRESH_TOKEN;

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const res = await fetch(url, {
            headers,
            method: 'POST',
            body: JSON.stringify(query),
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const resJson = await res.json();
        return resJson;
    } catch (error) {
        throw error;
    }
}
