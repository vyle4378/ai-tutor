from openai import OpenAI

# Set your API key
client = OpenAI(api_key="")

def chat_with_gpt(prompt):
    try:
        # Create a chat completion
        response = client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="gpt-4",  
        )
        # Extract and return the response text
        return response.choices[0].message.content.strip()
    
    except Exception as e:
        return f"An error occurred: {str(e)}"

# Example usage
if __name__ == "__main__":
    prompt = "What is Python?"
    response = chat_with_gpt(prompt)
    print(f"ChatGPT: {response}")

