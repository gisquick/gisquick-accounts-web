<template>
  <div class="agreement">
    <h1>Terms of Service</h1>
    <h2>Service and description</h2>
    <p>
      Gisquick hub is instance of the <a href="https://gisquick.org/" target="_blank">Gisquick</a>
      project (referred as the project), provided by <a href="https://opengeolabs.cz/" target="_blank">OpenGeoLabs</a>
      company (referred as the provider). It enables you to either evaluate or use Gisquick
      on our servers, so no need to install and manage the Docker containers.
    </p>
    <p>
      The service is provided free of charge for limited amount of data and limited amount
      of projects published under one account. We provide the service at our good will hoping,
      we've build the platform for many people, who just what to share their map to the public
      (or within small communities).
    </p>

    <p>
      If you disagree with our conditions, you can always download and install Gisquick on your
      hardware infrastructure and not being dependent on ours. Gisquick is an well documented
      (as we hope) open source project.
    </p>

    <h2>Disclaimer</h2>
    <p>
      The service is provided as it is, by our best intention and capabilities and at the
      technical level allowed by our infrastructure. OpenGeoLabs s.r.o. takes no responsibility
      for any damages caused by the service not running (from technical, administrative or other reasons)
      or deleting your data. You may always make backup of your data and never trust this service
      for using it as backup or having it with unique copy of your data files.
    </p>

    <p>
      We also strongly advice, not to upload any sensitive, secrete or anyhow precious
      content of yours. Gisquick was not designed for storage of sensitive informations,
      it's designed for data sharing.
    </p>

    <p>Also, the platform is not intended for sharing illegal data content.</p>

    <p>
      The service provider can delete any content in the future, which would violate
      our service conditions and size limits. Even we will always try to reach you
      in advance with the information of your data being deleted, we may also apply
      quick deactivation of any project, which would violate our service conditions,
      this may not happen in emergency cases.
    </p>
  </div>
</template>

<style lang="scss" scoped>
.agreement {
  line-height: 1.5;
  h1 {
    font-size: 28px;
    margin-block: 8px;
    font-weight: bold;
  }
  h2 {
    font-size: 24px;
    margin-block: 12px 8px;
    font-weight: 500;
    text-align: center;
  }
  p {
    margin-block: 0 12px;
  }
  a {
    color: var(--color-primary);
    font-weight: 500;
  }
}
</style>
