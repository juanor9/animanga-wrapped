const TermsAndConditionsPage = () => (
  <main>
    <h1>TERMS AND CONDITIONS OF USE FOR &ldquo;YOUR ANIME AND MANGA YEAR WRAPPED&ldquo;</h1>
    <h2>PREAMBLE</h2>
    <p>
      This Agreement (hereinafter referred to as &ldquo;the Agreement&ldquo;) outlines the terms and
      conditions governing the use of the software application named &ldquo;Your Anime and Manga
      Year Wrapped&ldquo; (hereinafter referred to as &ldquo;the Application&ldquo;), designed,
      developed, maintained, and licensed by Tanuki SAS, a business entity incorporated under the
      laws of the Republic of Colombia, identified with NIT number 901182452-4 (hereinafter referred
      to as &ldquo;the Licensor&ldquo; or &ldquo;the Company&ldquo;).
    </p>
    <h2>1. Purpose and Binding Effect</h2>
    <p>
      1.1. This Agreement establishes the foundational terms, conditions, rights, obligations, and
      understandings between the User (hereinafter referred to as &ldquo;the Licensee&ldquo;) and
      the Licensor regarding the utilization of the Application.
    </p>
    <p>
      1.2. The Licensee, by accessing, browsing, and/or availing themselves of the functionalities
      offered by the Application, acknowledges, agrees, and binds themselves to the stipulations set
      forth herein.
    </p>
    <h2>2. Scope and Modification of Services</h2>
    <p>
      2.1. The Application, in its core essence, furnishes the Licensee with an intricate and
      detailed statistical analysis predicated upon their manga and anime consumption metrics as
      recorded on Anilist within the designated fiscal year.
    </p>
    <p>
      2.2. The Licensor reserves an inalienable right, at its sole discretion, to introduce updates,
      enhancements, modifications, or changes to the Application, whether for the rectification of
      operational discrepancies, the annual augmentation of code, or the infusion of novel features.
    </p>
    <p>
      2.3. Any substantive or significant alterations, modifications, or changes to the
      Application&apos;s core functionalities will be duly communicated to Licensees via electronic
      mail.
    </p>
    <h2>3. Licensee&apos;s Representations, Warranties, and Covenants</h2>
    <p>
      3.1. The Licensee solemnly covenants to utilize the Application in strict adherence to the
      extant legal framework, established societal moralities, and universally accepted norms of
      good conduct. Any usage for illicit, unauthorized, or prohibited purposes, or in contravention
      of the stipulations of this Agreement, shall be deemed a breach hereof.
    </p>
    <h2>4. Registration, Data Processing, and Privacy Considerations</h2>
    <p>
      4.1. Licensees intending to avail themselves of the complete spectrum of services offered by
      the Application are mandatorily required to register, furnishing accurate, current, and
      verifiable personal data.
    </p>
    <p>
      4.2. The Licensor, in its capacity as the data controller, will process, handle, manage, and
      utilize such data in conformity with the prevailing data protection legislations, regulatory
      directives, and the intricacies delineated in the Application&apos;s
      <a href="./privacy-policy">Privacy Policy</a>.
    </p>
    <h2>5. Data Safeguarding and Third-Party Disclosures</h2>
    <p>
      5.1. Personal and usage data entrusted to the Licensor shall be safeguarded with paramount
      attention to security, confidentiality, and integrity, leveraging state-of-the-art protective
      measures, including but not limited to those offered by MongoDB and encryption methodologies
      like crypto and bcrypt.
    </p>
    <p>
      5.2. With the express and informed consent of the Licensee, the Licensor retains the
      unequivocal right to monetize, trade, or sell such data to vetted third-party entities. These
      third-party entities are strictly circumscribed to contact Licensees a singular time for every
      acquisition of data and are proscribed from disseminating this data outside their
      organizational confines.
    </p>
    <h2>6. Digital Footprints and Cookies</h2>
    <p>
      6.1. The Application, in its operational design, utilizes digital cookies to record and store
      rudimentary access information of the Licensee, the primary intent of which is to expedite and
      enhance the user experience by hastening Application load times.
    </p>
    <h2>7. Data Upload and Storage Policy</h2>
    <p>
      7.1. To enhance performance and reduce redundant data storage, the Application has implemented
      a differentiated storage system for user-uploaded images. When a user generates content, such
      as a statistical summary image (&ldquo;Story Card&ldquo;), this content is uploaded to our
      secure cloud storage provider (Cloudinary).
    </p>
    <p>
      7.2. Upload Classification: All image uploads are categorized by a mandatory &apos;type&apos;
      field to determine the handling logic:
    </p>
    <ul>
      <li>
        <strong>Type &apos;media&apos;:</strong> This category is reserved for shared, non-personal
        assets, such as cover images for anime or manga series. Before uploading, the system checks
        if an identical asset (by name) already exists in our global media folder
        (&apos;animanga-wrapped/media_assets/&apos;). If a duplicate is found, the existing
        asset&apos;s URL is returned, preventing re-upload and conserving resources.
      </li>
      <li>
        <strong>Type &apos;stats&apos;:</strong> This category is for unique, user-specific
        generated images, such as personalized statistical charts and graphics. These images are
        uploaded directly to a private folder designated for the specific user
        (&apos;animanga-wrapped/users/username/&apos;), ensuring user data is isolated and not
        duplicated.
      </li>
    </ul>
    <p>
      7.3. All uploaded images are accessible only via a secure URL (HTTPS) provided by the service
      upon a successful upload.
    </p>
    <h2>8. Intellectual Property and Copyright Concerns</h2>
    <p>
      8.1. The Licensor retains full, exclusive, and unalienable rights over the source code, design
      paradigms, architectural schemas, and other proprietary elements of the Application.
    </p>
    <p>
      8.2. Any graphical representations, images, or references of individual manga or anime are the
      sole intellectual properties of their respective copyright holders and are employed herein
      strictly for referential purposes.
    </p>
    <p>
      8.3. Content Generated by the User: The Licensee retains full ownership rights to the content
      they generate using the Application, such as the downloadable &apos;Story Cards&apos;. By
      generating and uploading this content, the Licensee grants the Licensor a worldwide,
      non-exclusive, royalty-free, sublicensable, and transferable license to use, reproduce,
      distribute, prepare derivative works of, display, and perform the content in connection with
      the service provided by the Application and for promoting the service.
    </p>
    <p>
      8.4. Licensees are permitted to share self-generated content on personal digital platforms.
      Notwithstanding, the intellectual property rights of these creations remain vested with the
      Licensor. Reproductions in physical formats are strictly proscribed.
    </p>
    <h2>9. Limitation of Liability, Indemnification, and Warranties</h2>
    <p>
      9.1. The Licensor does not furnish any warranty or guarantee regarding the Application&apos;s
      uninterrupted availability or operational consistency.
    </p>
    <p>
      9.2. The Application is provisioned to the Licensee on an &ldquo;as is&ldquo; and &ldquo;as
      available&ldquo; basis, devoid of any implied or express warranties.
    </p>
    <p>
      9.3. Licensees hereby agree to indemnify and hold harmless the Licensor from any damages,
      liabilities, or legal ramifications arising from misuse or unauthorized utilization of the
      Application.
    </p>
    <h2>10. Compliance with AniList API Terms</h2>
    <p>
      10.1. The Application&apos;s operational mechanics are intertwined with the AniList API.
      Licensees hereby acknowledge and accede to the terms stipulated by AniList, which include
      prohibitions on data storage, mass collection, and the mandated adherence to naming
      conventions.
    </p>
    <p>
      10.2. To ensure full compliance with AniList&apos;s terms of service, the Application
      explicitly does not store, cache, or otherwise retain any raw data fetched from the AniList
      API. The only data stored by the Application are the user&apos;s registration details (as
      outlined in the Privacy Policy) and the user-generated statistical images (&apos;stats&apos;
      type), which are considered derivative works and not a direct copy of AniList data.
    </p>
    <p>10.3. Naming Guidelines:</p>
    <p>
      The Application unambiguously demarcates its unofficial affiliation with AniList or AniChart,
      ensuring compliance with AniList&apos;s naming directives.
    </p>
    <p>10.4. Adult Content Disclaimer:</p>
    <p>
      Licensees are notified that the Application, while relying on AniList&apos;s isAdult boolean,
      does not guarantee the accurate categorization of content. Licensees are thus advised to exert
      discretion and prudence.
    </p>
    <p>
      10.5. Licensees curious about the commercial nuances of the AniList API are directed to engage
      in direct correspondence with AniList representatives at the furnished contact details.
    </p>
    <h2>11. Governing Law and Jurisdiction</h2>
    <p>
      11.1. This Agreement, in its entirety, is governed by and construed in accordance with the
      substantive and procedural laws of the Republic of Colombia.
    </p>
    <p>
      11.2. Any disputes, contentions, disagreements, or litigations arising from or related to the
      Application, the Licensor, or this Agreement shall be adjudicated exclusively by the competent
      courts of the Republic of Colombia.
    </p>
  </main>
);
export default TermsAndConditionsPage;
