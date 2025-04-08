from openai import OpenAI
import base64

API_KEY = ''
client = OpenAI(api_key=API_KEY)

def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

image_path = 'test.png'
image_base64 = encode_image(image_path)

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", 
               "content": [
                    {
                        "type": "text", 
                        "text": 'prompt: Tierra inflated her basketball indoors at 31.7°C to a pressure of 23.8 psi. She then placed it in her car, which was at 3.0°C. When she arrived at school, the ball felt flat. What is the new pressure of the basketball?'
                    },
                    {
                        "type": "text", 
                        "text": "Look at the image and tell me if the student solved the problem correctly or not. What did they do wrong?"
                    },
                    {
                        "type": "image_url", 
                        "image_url": {
                            "url": f"data:image/png;base64,{image_base64}",
                            "detail": "low"
                        }
                    }
                ]
               }],
)

print(response)