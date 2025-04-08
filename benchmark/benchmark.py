from openai import OpenAI
import base64
import json
API_KEY = ''
client = OpenAI(api_key=API_KEY)

prompt = "How many moles of gas occupy 98 L at a pressure of 2.8 atmospheres and a temperature of 292 K?"
rubric = "1pt: Use the correct formula/concept (PV=nRT). Don't look at the rearrangement yet. \n \
        1pt: Rearrange to solve for n (n=PV/RT). \n \
        1pt: Substitute the correct value for each variable (P=2.8 atm, V=98 L, T=292 K, R=0.0821 L atm/mol K). \n \
        1pt: Full credit for correct value (11.45, or close to it, like 11, 12, 11.5) and correct units (moles, mol, or mole). \
        Give 0.5pt if the answer is correct but doesn't have units or if the units are wrong."
context = {
        "type": "text", 
        "text": "You are a grading assistant. \
        You will be given the problem, an image of a student's work, and a rubric. \
        Return a JSON object with the following fields: \
        'student_points': a list of the points the student got for each rubric point, \
        'feedback': a list of feedback for each rubric point. If right, just say 'correct'. If wrong, briefly say what they did wrong in less than 10 words. \
        'total_score': the total score."
    }


# def print_score(dataset) -> None:
#     correct_count = 0
#     for data in dataset:
#         if (data['is_correct']) == is_correct(data):
#             correct_count += 1
#     print(f"{correct_count}/{len(dataset)} or {correct_count*100/len(dataset)}%")

# def is_correct(data) -> bool:
#     img_base64 = encode_image(data['image_path'])
#     response = client.chat.completions.create(
#         model="gpt-4.5-preview",
#         messages=[{"role": "user", 
#                 "content": [
#                     context,
#                     {"type": "text", "text": f"Problem: {prompt}"},
#                     {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{img_base64}", "detail": "low"}},
#                     {"type": "text", "text": f"Rubric: {rubric}"}
#                 ]}]
#     )

#     print(data['image_path'], response.choices[0].message.content)
#     if "True" in response.choices[0].message.content:
#         return True
#     else:
#         return False


def print_score(dataset) -> None:
    correct_count = 0
    for data in dataset:
        print(data)
        if (data['points_earned']) == calc_score(data):
            correct_count += 1
            print('---------match---------')
        else:
            print('---------no match---------')
    print(f"{correct_count}/{len(dataset)} or {correct_count*100/len(dataset)}%")

def calc_score(data) -> int:
    img_base64 = encode_image(data['image_path'])
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", 
                "content": [
                    context,
                    {"type": "text", "text": f"Problem: {prompt}"},
                    {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{img_base64}", "detail": "low"}},
                    {"type": "text", "text": f"Rubric: {rubric}"}
                ]}]
    )

    try:
        # remove the \n, ```json, and ```
        content = response.choices[0].message.content.strip().replace("```json", "").replace("```", "")
        feedback = json.loads(content)
        print(feedback)
        return feedback['total_score']
    except json.JSONDecodeError as e:
        print(f"Failed to parse JSON. Response content:\n{content}")
        print(f"Error: {e}")
        return -1

def encode_image(image_path) -> str:
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')


if __name__ == "__main__":
    dataset = [
        {
            'image_path': 'images/calcError.png',
            'is_correct': False,
            'student_points': [1, 1, 1, 0],
            'points_earned': 3
        },
        {
            'image_path': 'images/incR.png',
            'is_correct': False,
            'student_points': [1, 1, 0, 0],
            'points_earned': 2
        },
        {
            'image_path': 'images/incRearrange.png',
            'is_correct': False,
            'student_points': [1, 0, 1, 0],
            'points_earned': 2
            # it penalized twice for the same error. Fixed it with detailed instructions.
        },
        {
            'image_path': 'images/swapPnT.png',
            'is_correct': False,
            'student_points': [1, 1, 0, 0],
            'points_earned': 2
            # it didn't see that I swapped P and T values. A LOT
        },
        {
            'image_path': 'images/sillyDec.png',
            'is_correct': False,
            'student_points': [1, 1, 1, 0.5],
            'points_earned': 3.5
            # it didn't see that the value is wrong (.11 is not the same as 11 but it doesn't see that). A LOT
        },
        {
            'image_path': 'images/ok.png',
            'is_correct': True,
            'student_points': [1, 1, 1, 1],
            'points_earned': 4
        },
        {
            'image_path': 'images/noUnit.png',
            'is_correct': False,
            'student_points': [1, 1, 1, 0.5],
            'points_earned': 3.5
            # it didn't see that I didn't have units. A LOT
        }
    ]

    print_score(dataset)
    
    # for data in dataset:
    #     print(calc_score(data))