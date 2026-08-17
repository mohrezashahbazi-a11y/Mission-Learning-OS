package com.missionlearningos.app;

import android.app.Activity;
import android.os.Bundle;
import android.net.Uri;
import androidx.browser.customtabs.CustomTabsIntent;

public class MainActivity extends Activity {
    private static final String URL = "https://mohrezashahbazi-a11y.github.io/Mission-Learning-OS/";
    @Override public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        CustomTabsIntent intent = new CustomTabsIntent.Builder().build();
        intent.launchUrl(this, Uri.parse(URL));
    }
}
