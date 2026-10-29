import { API_BASE_URL } from './api';

const MAX_CLIENT_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_EXTENSIONS = ['pdf', 'docx', 'txt'];

export const algorithmService = {
  /**
   * Validates an uploaded algorithm research paper document
   * against the backend validation endpoint.
   *
   * @param {File} file
   * @returns {Promise<{
   *   accepted: boolean,
   *   filename: string,
   *   detected_algorithms: string[],
   *   reason: string,
   *   evidence: string[],
   *   extracted_text_length: number
   * }>}
   */
  async validateFile(file) {
    if (!file) {
      return {
        accepted: false,
        filename: '',
        detected_algorithms: [],
        reason: 'No file was provided for validation.',
        evidence: [],
        extracted_text_length: 0,
      };
    }

    // Client-side quick extension check
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return {
        accepted: false,
        filename: file.name,
        detected_algorithms: [],
        reason: `Unsupported file format (.${ext}). Please upload a PDF, DOCX, or TXT document.`,
        evidence: [],
        extracted_text_length: 0,
      };
    }

    // Client-side quick size check
    if (file.size > MAX_CLIENT_FILE_SIZE) {
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
      return {
        accepted: false,
        filename: file.name,
        detected_algorithms: [],
        reason: `File size exceeds the 10 MB limit (${sizeMb} MB). Please upload a smaller document.`,
        evidence: [],
        extracted_text_length: 0,
      };
    }

    const formData = new FormData();
    formData.append('file', file);

    const baseUrl = API_BASE_URL || '';
    const endpoint = `${baseUrl}/api/algorithms/validate-file`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        let errMessage = `Server error (${response.status})`;
        try {
          const errData = await response.json();
          if (errData && errData.detail) {
            errMessage = errData.detail;
          }
        } catch (_) {
          // Keep generic error message if JSON parsing fails
        }
        return {
          accepted: false,
          filename: file.name,
          detected_algorithms: [],
          reason: errMessage,
          evidence: [],
          extracted_text_length: 0,
        };
      }

      return await response.json();
    } catch (networkError) {
      return {
        accepted: false,
        filename: file.name,
        detected_algorithms: [],
        reason: `Connection error: Unable to reach validation service. Ensure backend is running. (${networkError.message})`,
        evidence: [],
        extracted_text_length: 0,
      };
    }
  },
};

export default algorithmService;
