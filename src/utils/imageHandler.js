import * as ImageManipulator from "expo-image-manipulator";

export const processSitePhoto = async (uri) => {
  // Requirement 2.3: Resize/Compress locally
  const manipulatedImage = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 800 } }],
    { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG },
  );

  return manipulatedImage.uri;
};
