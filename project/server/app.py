from flask import Flask, request, send_file, jsonify
from gtts import gTTS
import os
from flask_cors import CORS
import tempfile
import logging

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Language mapping with fallbacks
LANGUAGE_MAPPING = {
    'en': 'en',    # English
    'hi': 'hi',    # Hindi
    'te': 'te',    # Telugu
    'ta': 'ta',    # Tamil
    'bn': 'bn',    # Bengali
    'mr': 'mr',    # Marathi
    'gu': 'gu',    # Gujarati
    'kn': 'kn',    # Kannada
    'ml': 'ml',    # Malayalam
    'pa': 'pa',    # Punjabi
    'or': 'or',    # Odia
    'ur': 'ur',    # Urdu
    # Fallback to English for unsupported languages
    'default': 'en'
}

@app.route('/api/tts', methods=['POST'])
def text_to_speech():
    try:
        data = request.get_json()
        text = data.get('text', '')
        lang = data.get('lang', 'en')
        
        if not text:
            return jsonify({'error': 'No text provided'}), 400
        
        # Get the appropriate language code with fallback
        lang_code = LANGUAGE_MAPPING.get(lang, LANGUAGE_MAPPING['default'])
        
        logger.info(f'Generating TTS for {len(text)} characters in {lang} (using {lang_code})')
        
        # Create a temporary file with a unique name
        with tempfile.NamedTemporaryFile(delete=False, suffix='.mp3') as temp_file:
            temp_path = temp_file.name
        
        try:
            # Generate speech with error handling
            tts = gTTS(text=text, lang=lang_code, lang_check=False)
            tts.save(temp_path)
            
            # Check if file was created and has content
            if not os.path.exists(temp_path) or os.path.getsize(temp_path) == 0:
                raise Exception('Failed to generate speech: Empty file')
                
            return send_file(
                temp_path,
                mimetype='audio/mpeg',
                as_attachment=False,
                download_name='speech.mp3'
            )
            
        except Exception as e:
            logger.error(f'TTS generation failed: {str(e)}')
            # Fallback to English if the requested language fails
            if lang_code != 'en':
                logger.info('Attempting fallback to English')
                tts = gTTS(text=text, lang='en')
                tts.save(temp_path)
                return send_file(
                    temp_path,
                    mimetype='audio/mpeg',
                    as_attachment=False,
                    download_name='speech.mp3'
                )
            raise
            \n    except Exception as e:
        logger.error(f'Error in TTS endpoint: {str(e)}')
        return jsonify({'error': 'Failed to generate speech', 'details': str(e)}), 500
        
    finally:
        # Clean up the temporary file after sending
        if 'temp_path' in locals() and os.path.exists(temp_path):
            try:
                os.unlink(temp_path)
            except Exception as e:
                logger.error(f'Error cleaning up temp file: {str(e)}')

if __name__ == '__main__':
    app.run(port=5000)
