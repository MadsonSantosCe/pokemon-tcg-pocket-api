export const formatJson = (textJson: string) => {
  const responseText = textJson.replace(/^```json\n/, "").replace(/\n```$/, "");

  try {
    const jsonResponse = JSON.parse(responseText);
    return jsonResponse;
  } catch (parseError) {
    return {
      error: "Erro ao converter resposta para JSON:",
      rawText: responseText,
    };
  }
};
