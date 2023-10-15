# BeSus - Be sustainable, one small step at a time

Created by Frenk Dragar and Marek Miltner for TED AI Hackathon 2023

We showcase BeSus, a social media platform that helps (not just) young people reduce their climate anxiety by giving them one clear action step each day to help the climate, while virtue signalling to their friends.

Everyone can take small steps towards improving their sustainability efforts, via getting personalized recommendations for actions that come at the perfect times of day and do not take much time or effort to pull off. In the end, the user takes a picture to show they have completed their BeSus today and helped improve the world just a little bit.

## Environment variables

```md
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Firebase Cloud Functions
The Palm 2 API is trigerred on Firebase when a user profile gets changed. We also schedule a new sustainable action suggestion every day at an opportune time for the user, in order to have maximum impact and behavioural nudge.

## Deployment

To deploy your Next.js application with Firebase, follow the Firebase deployment instructions specific to your hosting option (Firebase Hosting, Cloud Functions, etc.). Make sure to set up the appropriate environment variables for your production environment.

## Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
