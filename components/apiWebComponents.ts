import axios, { AxiosInstance } from 'axios';

class ApiWebComponents {
    private api: AxiosInstance;
    private baseUrl: string;

    constructor() {
        this.baseUrl = process.env.BASE_URL || 'http://povio-at.herokuapp.com';
        this.api = axios.create({
            baseURL: this.baseUrl,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
            },
        });
    }

    private async getAuthToken(): Promise<string> {
        const response = await this.api.get('/users/sign_up');
        const match = response.data.match(/name="authenticity_token" value="([^"]+)"/);
        return match ? match[1] : '';
    }

    async signUp(name: string, email: string, password: string): Promise<any> {
        try {
            // First get the CSRF token from the sign up page
            const signUpPageResponse = await this.api.get('/users/sign_up');
            const authToken = signUpPageResponse.data.match(/name="authenticity_token" value="([^"]+)"/)[1];

            // Get the session cookie from the response
            const sessionCookie = signUpPageResponse.headers['set-cookie']?.find(cookie => 
                cookie.includes('_rails-devise_session'));

            // Modified to exactly match the intercepted request format
            const formData = new URLSearchParams();
            formData.append('utf8', '✓');
            formData.append('authenticity_token', authToken);
            formData.append('user[name]', name);
            formData.append('user[email]', email);
            formData.append('user[password]', password);
            formData.append('user[password_confirmation]', password);
            formData.append('commit', 'Sign up');

            const response = await this.api.post('/users', formData.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                    'Upgrade-Insecure-Requests': '1',
                    'Origin': this.baseUrl,
                    'Referer': `${this.baseUrl}/users/sign_up`,
                    'Cookie': sessionCookie
                },
                maxRedirects: 0,
                validateStatus: (status) => {
                    return status >= 200 && status < 400; // Accept 2xx and 3xx status codes
                }
            });

            // Check if we got a redirect to the success page
            const isSuccess = response.status === 302 && 
                             (response.headers.location === '/' || 
                              response.headers.location === `${this.baseUrl}/`);

            return {
                success: isSuccess,
                data: response.data,
                headers: response.headers
            };
        } catch (error) {
            console.error('Error details:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            return {
                success: false,
                error: error.response?.data || error.message
            };
        }
    }

    async signIn(email: string, password: string): Promise<any> {
        try {
            // First get the CSRF token from the sign in page
            const signInPageResponse = await this.api.get('/users/sign_in');
            const authToken = signInPageResponse.data.match(/name="authenticity_token" value="([^"]+)"/)[1];

            // Get the session cookie from the response
            const sessionCookie = signInPageResponse.headers['set-cookie']?.find(cookie => 
                cookie.includes('_rails-devise_session'));

            // Create form data matching the intercepted request
            const formData = new URLSearchParams();
            formData.append('utf8', '✓');
            formData.append('authenticity_token', authToken);
            formData.append('user[email]', email);
            formData.append('user[password]', password);
            formData.append('user[remember_me]', '0');
            formData.append('commit', 'Sign in');

            const response = await this.api.post('/users/sign_in', formData.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                    'Upgrade-Insecure-Requests': '1',
                    'Origin': this.baseUrl,
                    'Referer': `${this.baseUrl}/users/sign_in`,
                    'Cookie': sessionCookie
                },
                maxRedirects: 0,
                validateStatus: (status) => {
                    return status >= 200 && status < 400; // Accept 2xx and 3xx status codes
                }
            });

            // Check if we got a redirect to the home page
            const isSuccess = response.status === 302 && 
                             (response.headers.location === '/' || 
                              response.headers.location === `${this.baseUrl}/`);

            if (isSuccess) {
                // Store the new session cookie if provided
                const newSessionCookie = response.headers['set-cookie']?.find(cookie => 
                    cookie.includes('_rails-devise_session'));
                if (newSessionCookie) {
                    this.api.defaults.headers.Cookie = newSessionCookie;
                }
            }

            return {
                success: isSuccess,
                data: response.data,
                headers: response.headers
            };
        } catch (error) {
            
            return {
                success: false,
                error: error.response?.data || error.message
            };
        }
    }

    async createCampaign(title: string, description: string): Promise<any> {
        const authToken = await this.getAuthToken();
        const formData = new URLSearchParams({
            'utf8': '✓',
            'authenticity_token': authToken,
            'campaign[title]': title,
            'campaign[description]': description,
            'commit': 'Create Campaign'
        });

        try {
            const response = await this.api.post('/campaigns', formData.toString());
            return {
                success: response.status === 200,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data || error.message
            };
        }
    }

    async cancelAccount(): Promise<any> {
        const authToken = await this.getAuthToken();
        const formData = new URLSearchParams({
            'utf8': '✓',
            'authenticity_token': authToken,
            '_method': 'delete'
        });

        try {
            const response = await this.api.delete('/users', {
                data: formData.toString()
            });
            return {
                success: response.status === 200,
                data: response.data
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data || error.message
            };
        }
    }

    async deleteAccount(): Promise<any> {
        try {
            // First get the CSRF token from the edit page
            const editPageResponse = await this.api.get('/users/edit');
            const authToken = editPageResponse.data.match(/name="authenticity_token" value="([^"]+)"/)[1];

            // Get the session cookie from the response
            const sessionCookie = editPageResponse.headers['set-cookie']?.find(cookie => 
                cookie.includes('_rails-devise_session'));

            // Create form data matching the intercepted request
            const formData = new URLSearchParams();
            formData.append('_method', 'delete');
            formData.append('authenticity_token', authToken);

            const response = await this.api.post('/users', formData.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                    'Upgrade-Insecure-Requests': '1',
                    'Origin': this.baseUrl,
                    'Referer': `${this.baseUrl}/users/edit`,
                    'Cookie': sessionCookie
                },
                maxRedirects: 0,
                validateStatus: (status) => {
                    return status >= 200 && status < 400; // Accept 2xx and 3xx status codes
                }
            });

            // Check if we got a redirect to the home page
            const isSuccess = response.status === 302 && 
                             (response.headers.location === '/' || 
                              response.headers.location === `${this.baseUrl}/`);

            return {
                success: isSuccess,
                data: response.data,
                headers: response.headers
            };
        } catch (error) {
            
            return {
                success: false,
                error: error.response?.data || error.message
            };
        }
    }

    // Helper method to check if user is logged in
    async isLoggedIn(): Promise<boolean> {
        try {
            const response = await this.api.get('/');
            return response.data.includes('Sign out'); 
        } catch (error) {
            return false;
        }
    }
} 

export default ApiWebComponents;