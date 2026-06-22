export interface Option {
  label: string;
  value: string;
  help?: string;
  description?: string;
}

export interface PhotoshootOptionsData {
  [key: string]: Option[];
}

export const PHOTOSHOOT_OPTIONS: PhotoshootOptionsData = {
  // Product Types
  productType: [
    { label: 'Fashion', value: 'fashion', help: 'Clothing and apparel' },
    { label: 'Jewelry', value: 'jewelry', help: 'Accessories and jewelry' },
    { label: 'Electronics', value: 'electronics', help: 'Tech products' },
    { label: 'Home & Decor', value: 'home', help: 'Home goods and decor' },
    { label: 'Beauty', value: 'beauty', help: 'Cosmetics and beauty products' },
    { label: 'Sports', value: 'sports', help: 'Sports equipment and gear' },
    { label: 'Food', value: 'food', help: 'Food and beverage products' },
  ],

  // Photoshoot Styles
  photoshootStyle: [
    { label: 'Modern', value: 'modern', help: 'Contemporary minimalist style' },
    { label: 'Classic', value: 'classic', help: 'Timeless elegant style' },
    { label: 'Luxury', value: 'luxury', help: 'High-end premium style' },
    { label: 'Casual', value: 'casual', help: 'Relaxed everyday style' },
    { label: 'Bohemian', value: 'bohemian', help: 'Artistic free-spirited style' },
    { label: 'Industrial', value: 'industrial', help: 'Raw urban style' },
    { label: 'Minimalist', value: 'minimalist', help: 'Simple clean style' },
    { label: 'Vintage', value: 'vintage', help: 'Retro nostalgic style' },
  ],

  // Output Types
  outputType: [
    { label: 'On Human', value: 'on-human', help: 'Product shown on a model' },
    { label: 'Mannequin', value: 'mannequin', help: 'Product on mannequin' },
    { label: 'Standalone', value: 'standalone', help: 'Product only without model' },
    { label: 'Lifestyle', value: 'lifestyle', help: 'Product in lifestyle setting' },
  ],

  // Aspect Ratios
  aspectRatio: [
    { label: '1:1 (Square)', value: '1:1', help: 'Square format for social media' },
    { label: '16:9 (Wide)', value: '16:9', help: 'Wide landscape format' },
    { label: '9:16 (Portrait)', value: '9:16', help: 'Tall portrait format' },
    { label: '4:3 (Standard)', value: '4:3', help: 'Standard format' },
    { label: '3:2 (Classic)', value: '3:2', help: 'Classic photo format' },
    { label: '2:3 (Portrait Classic)', value: '2:3', help: 'Portrait classic format' },
  ],

  // Watermark Types
  watermarkType: [
    { label: 'None', value: 'none', help: 'No watermark' },
    { label: 'Logo', value: 'logo', help: 'Logo watermark' },
    { label: 'Text', value: 'text', help: 'Text watermark' },
    { label: 'Branding', value: 'branding', help: 'Full branding watermark' },
  ],

  // AI Providers
  aiProvider: [
    { label: 'Google', value: 'google', help: 'Google Gemini AI' },
    { label: 'OpenAI', value: 'openai', help: 'OpenAI GPT models' },
    { label: 'Anthropic', value: 'anthropic', help: 'Anthropic Claude' },
  ],

  // Model Types
  modelType: [
    { label: 'Unisex', value: 'unisex', help: 'Gender neutral model' },
    { label: 'Male', value: 'male', help: 'Male model' },
    { label: 'Female', value: 'female', help: 'Female model' },
    { label: 'Child', value: 'child', help: 'Child model' },
    { label: 'Plus Size', value: 'plus-size', help: 'Plus size model' },
  ],

  // Model Origin/Ethnicity
  modelOrigin: [
    { label: 'Caucasian', value: 'caucasian', help: 'Caucasian ethnicity' },
    { label: 'African', value: 'african', help: 'African ethnicity' },
    { label: 'Asian', value: 'asian', help: 'Asian ethnicity' },
    { label: 'Hispanic', value: 'hispanic', help: 'Hispanic ethnicity' },
    { label: 'Middle Eastern', value: 'middle-eastern', help: 'Middle Eastern ethnicity' },
    { label: 'Mixed', value: 'mixed', help: 'Mixed ethnicity' },
  ],

  // Model Body Type
  modelBodyType: [
    { label: 'Slim', value: 'slim', help: 'Slim body type' },
    { label: 'Athletic', value: 'athletic', help: 'Athletic build' },
    { label: 'Average', value: 'average', help: 'Average build' },
    { label: 'Curvy', value: 'curvy', help: 'Curvy body type' },
    { label: 'Muscular', value: 'muscular', help: 'Muscular build' },
  ],

  // Model Pose
  modelPose: [
    { label: 'Standing', value: 'standing', help: 'Standing pose' },
    { label: 'Sitting', value: 'sitting', help: 'Sitting pose' },
    { label: 'Walking', value: 'walking', help: 'Walking pose' },
    { label: 'Dynamic', value: 'dynamic', help: 'Dynamic action pose' },
    { label: 'Reclining', value: 'reclining', help: 'Reclining pose' },
  ],

  // Model Expression
  modelExpression: [
    { label: 'Neutral', value: 'neutral', help: 'Neutral expression' },
    { label: 'Smiling', value: 'smiling', help: 'Smiling expression' },
    { label: 'Confident', value: 'confident', help: 'Confident expression' },
    { label: 'Happy', value: 'happy', help: 'Happy expression' },
    { label: 'Serious', value: 'serious', help: 'Serious expression' },
    { label: 'Playful', value: 'playful', help: 'Playful expression' },
  ],

  // Product Count
  productCount: [
    { label: '1', value: '1', help: 'Single product' },
    { label: '2', value: '2', help: 'Two products' },
    { label: '3', value: '3', help: 'Three products' },
    { label: '4', value: '4', help: 'Four products' },
    { label: '5+', value: '5+', help: 'Multiple products' },
  ],

  // Product Angle
  productAngle: [
    { label: 'Front', value: 'front', help: 'Front view' },
    { label: 'Back', value: 'back', help: 'Back view' },
    { label: 'Side', value: 'side', help: 'Side view' },
    { label: '45 Degree', value: '45-degree', help: '45 degree angle' },
    { label: '360 Degree', value: '360-degree', help: 'Complete 360 rotation' },
  ],

  // Composition Type
  compositionType: [
    { label: 'Side by Side', value: 'side-by-side', help: 'Images placed side by side' },
    { label: 'Stacked', value: 'stacked', help: 'Images stacked vertically' },
    { label: 'Grid', value: 'grid', help: 'Images in grid layout' },
    { label: 'Collage', value: 'collage', help: 'Creative collage layout' },
    { label: 'Carousel', value: 'carousel', help: 'Carousel/slider layout' },
  ],

  // Background Type
  backgroundType: [
    { label: 'White', value: 'white', help: 'Clean white background' },
    { label: 'Transparent', value: 'transparent', help: 'Transparent background' },
    { label: 'Color', value: 'color', help: 'Solid color background' },
    { label: 'Gradient', value: 'gradient', help: 'Gradient background' },
    { label: 'Blurred', value: 'blurred', help: 'Blurred background' },
    { label: 'Studio', value: 'studio', help: 'Professional studio setup' },
  ],

  // Environment Style
  environmentStyle: [
    { label: 'Studio', value: 'studio', help: 'Professional studio' },
    { label: 'Outdoor', value: 'outdoor', help: 'Outdoor natural setting' },
    { label: 'Urban', value: 'urban', help: 'Urban city setting' },
    { label: 'Natural', value: 'natural', help: 'Natural environment' },
    { label: 'Luxury', value: 'luxury', help: 'Luxury setting' },
    { label: 'Minimalist', value: 'minimalist', help: 'Minimalist environment' },
  ],

  // Color Scheme
  colorScheme: [
    { label: 'Warm', value: 'warm', help: 'Warm colors (reds, oranges, yellows)' },
    { label: 'Cool', value: 'cool', help: 'Cool colors (blues, purples, greens)' },
    { label: 'Neutral', value: 'neutral', help: 'Neutral colors (grays, blacks, whites)' },
    { label: 'Vibrant', value: 'vibrant', help: 'Bright vibrant colors' },
    { label: 'Pastel', value: 'pastel', help: 'Soft pastel colors' },
    { label: 'Monochrome', value: 'monochrome', help: 'Single color variations' },
  ],

  // Mood Tone
  moodTone: [
    { label: 'Energetic', value: 'energetic', help: 'High energy vibrant mood' },
    { label: 'Calm', value: 'calm', help: 'Peaceful calm mood' },
    { label: 'Professional', value: 'professional', help: 'Business professional mood' },
    { label: 'Luxury', value: 'luxury', help: 'Luxurious elegant mood' },
    { label: 'Playful', value: 'playful', help: 'Fun playful mood' },
    { label: 'Romantic', value: 'romantic', help: 'Romantic mood' },
  ],

  // Lighting Type
  lightingType: [
    { label: 'Natural', value: 'natural', help: 'Natural daylight' },
    { label: 'Studio', value: 'studio', help: 'Professional studio lighting' },
    { label: 'Golden Hour', value: 'golden-hour', help: 'Warm golden hour light' },
    { label: 'Harsh', value: 'harsh', help: 'Harsh direct light' },
    { label: 'Soft', value: 'soft', help: 'Soft diffused lighting' },
    { label: 'Dramatic', value: 'dramatic', help: 'Dramatic theatrical lighting' },
  ],

  // Light Direction
  lightDirection: [
    { label: 'Front', value: 'front', help: 'Light from front' },
    { label: 'Back', value: 'back', help: 'Light from back' },
    { label: 'Side', value: 'side', help: 'Light from side' },
    { label: 'Top', value: 'top', help: 'Light from top' },
    { label: 'Bottom', value: 'bottom', help: 'Light from bottom' },
    { label: 'All Around', value: 'all-around', help: 'Even lighting all around' },
  ],

  // Shot Composition
  shotComposition: [
    { label: 'Close Up', value: 'close-up', help: 'Close up detailed shot' },
    { label: 'Wide', value: 'wide', help: 'Wide establishing shot' },
    { label: 'Medium', value: 'medium', help: 'Medium balanced shot' },
    { label: 'Full Body', value: 'full-body', help: 'Full body shot' },
    { label: 'Detail Focus', value: 'detail-focus', help: 'Focus on product details' },
  ],

  // Camera Angle
  cameraAngle: [
    { label: 'Straight On', value: 'straight-on', help: 'Eye level straight on' },
    { label: 'High Angle', value: 'high-angle', help: 'Shot from above' },
    { label: 'Low Angle', value: 'low-angle', help: 'Shot from below' },
    { label: 'Dutch Angle', value: 'dutch-angle', help: 'Tilted/canted angle' },
    { label: 'Overhead', value: 'overhead', help: 'Shot from directly above' },
  ],

  // Depth of Field
  depthOfField: [
    { label: 'Shallow', value: 'shallow', help: 'Shallow depth of field (blurred background)' },
    { label: 'Medium', value: 'medium', help: 'Medium depth of field' },
    { label: 'Deep', value: 'deep', help: 'Deep depth of field (everything in focus)' },
  ],

  // Season
  season: [
    { label: 'Spring', value: 'spring', help: 'Spring season' },
    { label: 'Summer', value: 'summer', help: 'Summer season' },
    { label: 'Fall', value: 'fall', help: 'Fall/autumn season' },
    { label: 'Winter', value: 'winter', help: 'Winter season' },
  ],

  // Occasion
  occasion: [
    { label: 'Everyday', value: 'everyday', help: 'Everyday casual use' },
    { label: 'Party', value: 'party', help: 'Party/celebration' },
    { label: 'Business', value: 'business', help: 'Business/professional' },
    { label: 'Wedding', value: 'wedding', help: 'Wedding event' },
    { label: 'Vacation', value: 'vacation', help: 'Vacation/travel' },
    { label: 'Holiday', value: 'holiday', help: 'Holiday special' },
  ],

  // Time of Day
  timeOfDay: [
    { label: 'Morning', value: 'morning', help: 'Morning time' },
    { label: 'Afternoon', value: 'afternoon', help: 'Afternoon time' },
    { label: 'Evening', value: 'evening', help: 'Evening time' },
    { label: 'Night', value: 'night', help: 'Night time' },
    { label: 'Sunrise', value: 'sunrise', help: 'Sunrise time' },
    { label: 'Sunset', value: 'sunset', help: 'Sunset/golden hour' },
  ],

  // Target Audience
  targetAudience: [
    { label: 'Young Adults', value: 'young-adults', help: 'Ages 18-25' },
    { label: 'Adults', value: 'adults', help: 'Ages 25-40' },
    { label: 'Professionals', value: 'professionals', help: 'Working professionals' },
    { label: 'Parents', value: 'parents', help: 'Parents and families' },
    { label: 'Seniors', value: 'seniors', help: 'Senior adults 65+' },
    { label: 'All Ages', value: 'all-ages', help: 'General all ages' },
  ],

  // Market Segment
  marketSegment: [
    { label: 'Budget', value: 'budget', help: 'Budget/economy segment' },
    { label: 'Mid-Range', value: 'mid-range', help: 'Mid-range price segment' },
    { label: 'Premium', value: 'premium', help: 'Premium quality segment' },
    { label: 'Luxury', value: 'luxury', help: 'Luxury high-end segment' },
    { label: 'Niche', value: 'niche', help: 'Niche specialty market' },
  ],

  // Prop Density
  propDensity: [
    { label: 'Minimal', value: 'minimal', help: 'Minimal props focus on product' },
    { label: 'Light', value: 'light', help: 'Few supporting props' },
    { label: 'Moderate', value: 'moderate', help: 'Balanced mix of props' },
    { label: 'Heavy', value: 'heavy', help: 'Many props for context' },
  ],

  // Texture Emphasis
  textureEmphasis: [
    { label: 'Smooth', value: 'smooth', help: 'Emphasize smooth textures' },
    { label: 'Rough', value: 'rough', help: 'Emphasize rough textures' },
    { label: 'Soft', value: 'soft', help: 'Emphasize soft textures' },
    { label: 'Glossy', value: 'glossy', help: 'Emphasize glossy finish' },
    { label: 'Matte', value: 'matte', help: 'Emphasize matte finish' },
  ],

  // Material Focus
  materialFocus: [
    { label: 'Fabric', value: 'fabric', help: 'Focus on fabric material' },
    { label: 'Metal', value: 'metal', help: 'Focus on metal material' },
    { label: 'Wood', value: 'wood', help: 'Focus on wood material' },
    { label: 'Plastic', value: 'plastic', help: 'Focus on plastic material' },
    { label: 'Glass', value: 'glass', help: 'Focus on glass material' },
    { label: 'Leather', value: 'leather', help: 'Focus on leather material' },
  ],

  // Industry Type
  industryType: [
    { label: 'Fashion', value: 'fashion', help: 'Fashion industry' },
    { label: 'Technology', value: 'technology', help: 'Technology industry' },
    { label: 'Retail', value: 'retail', help: 'Retail commerce' },
    { label: 'Luxury', value: 'luxury', help: 'Luxury goods' },
    { label: 'Food & Beverage', value: 'food-beverage', help: 'Food and beverage' },
    { label: 'Beauty', value: 'beauty', help: 'Beauty and cosmetics' },
    { label: 'Home & Garden', value: 'home-garden', help: 'Home and garden' },
  ],

  // Brand Personality
  brandPersonality: [
    { label: 'Professional', value: 'professional', help: 'Professional corporate' },
    { label: 'Playful', value: 'playful', help: 'Fun and playful' },
    { label: 'Elegant', value: 'elegant', help: 'Elegant and refined' },
    { label: 'Bold', value: 'bold', help: 'Bold and daring' },
    { label: 'Friendly', value: 'friendly', help: 'Warm and friendly' },
    { label: 'Minimalist', value: 'minimalist', help: 'Simple and minimal' },
    { label: 'Artistic', value: 'artistic', help: 'Artistic and creative' },
  ],
};

export default PHOTOSHOOT_OPTIONS;
