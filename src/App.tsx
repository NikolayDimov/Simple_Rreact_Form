import { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: #f0f2f5;
    color: #333;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 400px;
    padding: 20px;
    border-radius: 10px;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;


const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    margin-bottom: 10px;
`;


const Label = styled.label`
    width: 80px; 
    text-align: right;
    margin-right: 10px;
`;


const Input = styled.input`
    flex: 1; /* Takes the remaining space */
    color: #333;
    background-color: #f0f2f5;
    `;

const TextArea = styled.textarea`
    flex: 1;
    color: #333;
    background-color: #f0f2f5;
`;

const Select = styled.select`
    flex: 1;
    color: #333;
    background-color: #f0f2f5;
`;


function App() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('author1');
    const [isLoading, setIsLoading] = useState(false);

    const authors = [
        { value: 'author1', label: 'Author 1' },
        { value: 'author2', label: 'Author 2' },
        { value: 'author3', label: 'Author 3' },
    ];

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAuthor(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const blog = { title, content, author };
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:5000/blogs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(blog),
            });
            setIsLoading(false);

            if (response.ok) {
                console.log('Blog saved successfully', blog);
                setTitle('');
                setContent('');
                setAuthor('author1');
            } else {
                console.error('Error saving blog:', response.statusText);
            }
        } catch (error) {
            console.error('Error saving blog:', error);
        }
    };

    return (
        <Container>
            <h2>React Form</h2>
            <Form onSubmit={handleSubmit}>
                <Content>
                    <Label htmlFor='title'>Title:</Label>
                    <Input
                        id='title'
                        name="title"
                        type='text'
                        placeholder='Add Title'
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Content>
                <Content>
                    <Label htmlFor='content'>Content:</Label>
                    <TextArea
                        id='content'
                        name="content"
                        placeholder='Add Content'
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </Content>
                <Content>
                    <Label htmlFor='author'>Author:</Label>
                    <Select
                        id="author"
                        name="author"
                        value={author}
                        onChange={handleSelectChange}
                    >
                        {authors.map((authorOption) => (
                            <option key={authorOption.value} value={authorOption.value}>
                                {authorOption.label}
                            </option>
                        ))}
                    </Select>
                </Content>
                {!isLoading && <button type='submit'>Add</button>}
                {isLoading && <button disabled>Adding ...</button>}
            </Form>
            <p>{title}</p>
            <p>{content}</p>
            <p>{author}</p>
        </Container >
    )
}

export default App
