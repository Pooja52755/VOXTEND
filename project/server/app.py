from flask import Flask, request, send_file
from gtts import gTTS
import os
from flask_cors import CORS
import tempfile

app = Flask(__name__)
CORS(app)

@app.route('/api/tts', methods=['POST'])
def text_to_speech():
    data = request.json
    text = data.get('text', '')
    lang = data.get('lang', 'en')
    
    # Create a temporary file
    temp_dir = tempfile.gettempdir()
    temp_path = os.path.join(temp_dir, 'output.mp3')
    
    # Generate speech
    tts = gTTS(text=text, lang=lang)
    tts.save(temp_path)
    
    return send_file(
        temp_path,
        mimetype='audio/mpeg',
        as_attachment=True,
        download_name='speech.mp3'
    )

if __name__ == '__main__':
    app.run(port=5000)
